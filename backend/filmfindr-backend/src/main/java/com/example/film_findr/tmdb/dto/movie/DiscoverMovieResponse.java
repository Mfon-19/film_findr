package com.example.film_findr.tmdb.dto.movie;

import java.util.List;

public record DiscoverMovieResponse(
        List<MovieResult> results
) {
}
