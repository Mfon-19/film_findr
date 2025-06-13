package com.example.film_findr.tmdb.dto.tv;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record SeasonDetails(
        int id,
        List<EpisodeDetails> episodes,
        @JsonProperty("poster_path") String posterPath,
        @JsonProperty("season_number") int seasonNumber,
        @JsonProperty("vote_average") float voteAverage,
        @JsonProperty("air_date") String airDate
) {
}
