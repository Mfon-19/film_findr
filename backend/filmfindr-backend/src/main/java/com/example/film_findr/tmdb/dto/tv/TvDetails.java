package com.example.film_findr.tmdb.dto.tv;

import com.example.film_findr.tmdb.dto.CreatedBy;
import com.example.film_findr.tmdb.dto.GenreDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record TvDetails(
        int id,
        String name,
        boolean adult,
        String overview,
        @JsonProperty("created_by") List<CreatedBy> createdBy,
        @JsonProperty("first_air_date") String firstAirDate,
        @JsonProperty("last_air_date") String lastAirDate,
        @JsonProperty("number_of_episodes") int numberOfEpisodes,
        @JsonProperty("number_of_seasons") int numberOfSeasons,
        @JsonProperty("original_language") String originalLanguage,
        @JsonProperty("poster_path") String posterPath,
        @JsonProperty("backdrop_path") String backdropPath,
        List<GenreDTO> genres,
        @JsonProperty("vote_average") float voteAverage,
        String status
) {
}
