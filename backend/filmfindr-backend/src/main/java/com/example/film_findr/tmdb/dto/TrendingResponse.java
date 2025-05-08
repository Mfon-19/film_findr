package com.example.film_findr.tmdb.dto;

import java.util.List;

public record TrendingResponse(
        List<MovieResult> results
) {
}
