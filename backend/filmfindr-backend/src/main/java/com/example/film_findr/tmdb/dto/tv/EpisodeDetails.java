package com.example.film_findr.tmdb.dto.tv;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EpisodeDetails(
        int id,
        String name,
        String overview,
        int runtime,
        @JsonProperty("episode_number") int episodeNumber,
        @JsonProperty("season_number") int seasonNumber,
        @JsonProperty("still_path") String stillPath
) {
}
