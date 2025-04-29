package com.example.film_findr.auth.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @NotNull @Column(unique = true)
    String username;

    @NotNull @Column(unique = true)
    String email;

    @NotNull
    String passwordHash;

    @Builder.Default
    private String roles = "USER";

    public User(String username, String email, String rawPassword) {
        this.username = username;
        this.email = email;
        this.passwordHash = rawPassword;
    }
}
