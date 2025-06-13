package com.example.film_findr.tmdb.dto.tv;

import com.example.film_findr.tmdb.dto.CreatedBy;

import java.util.List;

public record TvDetailsEnriched(
        int id,
        String name,
        boolean adult,
        String overview,
        List<CreatedBy> createdBy,
        String firstAirDate,
        String lastAirDate,
        int numberOfEpisodes,
        int numberOfSeasons,
        String originalLanguage,
        String posterPath,
        String backdropPath,
        List<String> genres,
        float voteAverage,
        String status,
        List<SeasonDetailsEnriched> seasons
) {
}
