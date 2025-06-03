package com.example.film_findr.tmdb.dto;

import java.util.List;

public interface MediaItem {
    int id();
    String overview();
    String posterPath();
    float voteAverage();
    List<Integer> genreIds();
}
