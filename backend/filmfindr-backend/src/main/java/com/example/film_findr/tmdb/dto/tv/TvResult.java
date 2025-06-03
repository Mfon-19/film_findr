package com.example.film_findr.tmdb.dto.tv;

import com.example.film_findr.tmdb.dto.MediaItem;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record TvResult(
        int id,
        String name,
        boolean adult,
        String overview,
        @JsonProperty("original_language") String originalLanguage,
        @JsonProperty("poster_path") String posterPath,
        @JsonProperty("backdrop_path") String backdropPath,
        @JsonProperty("genre_ids") List<Integer> genreIds,
        @JsonProperty("vote_average") float voteAverage
) implements MediaItem {
}
