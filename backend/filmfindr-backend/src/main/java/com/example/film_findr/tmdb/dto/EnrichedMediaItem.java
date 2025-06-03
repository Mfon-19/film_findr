package com.example.film_findr.tmdb.dto;

import java.util.List;

public interface EnrichedMediaItem {
    int id();
    String overview();
    String posterPath();
    float voteAverage();
    List<String> genres();
}
