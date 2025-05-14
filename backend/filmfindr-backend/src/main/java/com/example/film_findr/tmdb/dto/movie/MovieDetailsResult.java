package com.example.film_findr.tmdb.dto.movie;

import com.example.film_findr.tmdb.dto.GenreDTO;
import com.example.film_findr.tmdb.dto.Language;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record MovieDetailsResult (
        int id,
        String title,
        String overview,
        boolean adult,
        int runtime,
        @JsonProperty("backdrop_path") String backdropPath,
        @JsonProperty("poster_path") String posterPath,
        @JsonProperty("release_date") String releaseDate,
        @JsonProperty("vote_average") float voteAverage,
        @JsonProperty("genres") List<GenreDTO> genres,
        @JsonProperty("spoken_languages") List<Language> spokenLanguages
) {
}
