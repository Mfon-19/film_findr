package com.example.film_findr.tmdb.dto;

import java.util.List;

public record MovieResultEnriched(
        int id,
        String title,
        String overview,
        String posterPath,
        String releaseDate,
        float voteAverage,
        List<String> genreIds
) {
}
