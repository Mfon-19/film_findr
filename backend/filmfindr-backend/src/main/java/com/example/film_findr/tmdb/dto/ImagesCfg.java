package com.example.film_findr.tmdb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ImagesCfg(
        @JsonProperty("secure_base_url") String secureBaseUrl,
        @JsonProperty("poster_sizes") List<String> posterSizes
) {
}
