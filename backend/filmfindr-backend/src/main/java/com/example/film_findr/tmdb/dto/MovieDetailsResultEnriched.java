package com.example.film_findr.tmdb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

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
