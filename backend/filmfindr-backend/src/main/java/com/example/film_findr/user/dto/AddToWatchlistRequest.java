package com.example.film_findr.user.dto;

import java.util.UUID;

public record AddToWatchlistRequest(
        UUID userId,
        Content content
) {
}
