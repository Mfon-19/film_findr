package com.example.film_findr.tmdb.dto.movie;

import com.example.film_findr.tmdb.dto.MediaItem;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record MovieResult(
        int id,
        String title,
        String overview,
        @JsonProperty("poster_path") String posterPath,
        @JsonProperty("release_date") String releaseDate,
        @JsonProperty("vote_average") float voteAverage,
        @JsonProperty("genre_ids") List<Integer> genreIds
) implements MediaItem {
}


