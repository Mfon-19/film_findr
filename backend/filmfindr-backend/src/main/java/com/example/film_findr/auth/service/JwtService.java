package com.example.film_findr.auth.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {
    private static final String CLAIM_ROLES = "roles";
    private static final String CLAIM_TYPE = "typ";
    private static final String TYPE_ACCESS = "ACCESS";
    private static final String TYPE_REFRESH = "REFRESH";

    @Value("${security.jwt.secret}")
    private String secret;

    private Key key;

    @PostConstruct
    private void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String issueAccessToken(UUID userId, String email, String roles, Duration ttl) {
        return buildToken(userId, email, roles, ttl, TYPE_ACCESS);
    }

    public String issueRefreshToken(UUID userId, String email, Duration ttl) {
        return buildToken(userId, email, null, ttl, TYPE_REFRESH);
    }

    public String parseRefreshToken(String refreshToken) {
        Claims c = parse(refreshToken, TYPE_REFRESH);
        return c.get("email", String.class);
    }

    public Claims parseAccessToken(String accessToken) {
        return parse(accessToken, TYPE_ACCESS);
    }

    private Claims parse(String token, String expectedType) {
        Claims claims = Jwts.parser()
                .verifyWith((SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        if (!expectedType.equals(claims.get(CLAIM_TYPE, String.class))) {
            throw new JwtException("Invalid token type");
        }

        return claims;
    }

    private String buildToken(
            UUID userId,
            String email,
            String roles,
            Duration ttl,
            String type
    ) {
        Instant now = Instant.now();

        JwtBuilder builder = Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(ttl)))
                .claim(CLAIM_TYPE, type)
                .claim("email", email);

        if (roles != null) {
            builder.claim(CLAIM_ROLES, roles);
        }

        return builder.signWith(key, SignatureAlgorithm.HS256).compact();
    }
}
