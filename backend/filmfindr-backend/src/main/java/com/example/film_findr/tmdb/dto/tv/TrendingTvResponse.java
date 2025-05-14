package com.example.film_findr.tmdb.dto.tv;

import java.util.List;

public record TrendingTvResponse(
        List<TvResult> results
) {
}
