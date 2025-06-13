package com.example.film_findr.tmdb.dto.tv;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record SeasonDetailsEnriched(
        int id,
        List<EpisodeDetailsEnriched> episodes,
        String posterPath,
        int seasonNumber,
        float voteAverage,
        String airDate
) {

}
