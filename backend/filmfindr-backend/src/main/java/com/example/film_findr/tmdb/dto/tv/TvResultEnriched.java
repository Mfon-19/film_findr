package com.example.film_findr.tmdb.dto.tv;

import java.util.List;

public record TvResultEnriched(
        int id,
        String name,
        boolean adult,
        String overview,
        String originalLanguage,
        String posterPath,
        String backdropPath,
        List<String> genres,
        float voteAverage
) {
}
