package com.example.film_findr.user.dto;

import java.util.UUID;

public record RemoveWatchlistRequest(
        UUID userId,
        String contentId
) {
}
