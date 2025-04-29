package com.example.film_findr.auth.dto;

import com.example.film_findr.auth.model.User;

public record LoginResponse(
        String accessToken,
        long accessExpiresIn,
        String refreshToken,
        long refreshExpiresIn,
        User user
) {
}
