package com.example.film_findr.tmdb.dto.movie;

import java.util.List;

public record MovieDetailsResultEnriched (
        int id,
        String title,
        String overview,
        boolean adult,
        int runtime,
        String backdropPath,
        String posterPath,
        String releaseDate,
        float voteAverage,
        List<String> genres,
        String language
) {
}
