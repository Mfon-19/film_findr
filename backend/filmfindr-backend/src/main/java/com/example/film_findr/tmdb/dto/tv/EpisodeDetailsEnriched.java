package com.example.film_findr.tmdb.dto.tv;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EpisodeDetailsEnriched(
        int id,
        String name,
        String overview,
        int runtime,
        int episodeNumber,
        int seasonNumber,
        String stillPath
) {
    public EpisodeDetails withStillPath(String newStillPath) {
        return new EpisodeDetails(
                id,
                name,
                overview,
                runtime,
                episodeNumber,
                seasonNumber,
                newStillPath
        );
    }
}
