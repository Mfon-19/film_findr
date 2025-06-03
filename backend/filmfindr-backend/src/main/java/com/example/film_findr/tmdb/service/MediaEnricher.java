package com.example.film_findr.tmdb.service;

import com.example.film_findr.tmdb.dto.ImagesCfg;
import com.example.film_findr.tmdb.dto.movie.MovieResult;
import com.example.film_findr.tmdb.dto.movie.MovieResultEnriched;
import com.example.film_findr.tmdb.dto.tv.TvResult;
import com.example.film_findr.tmdb.dto.tv.TvResultEnriched;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
public class MediaEnricher {

    private final ImageUrlBuilder imageUrlBuilder;

    public MediaEnricher(ImageUrlBuilder imageUrlBuilder) {
        this.imageUrlBuilder = imageUrlBuilder;
    }

    public MovieResultEnriched enrichMovie(MovieResult movie, Map<Integer, String> genreMap, ImagesCfg imageCfg) {
        return new MovieResultEnriched(
                movie.id(),
                movie.title(),
                movie.overview(),
                imageUrlBuilder.buildPosterUrl(movie.posterPath(), imageCfg, "w500"),
                movie.releaseDate(),
                movie.voteAverage(),
                mapGenres(movie.genreIds(), genreMap)
        );
    }

    public TvResultEnriched enrichTvShow(TvResult show, Map<Integer, String> genreMap, ImagesCfg imageCfg) {
        return new TvResultEnriched(
                show.id(),
                show.name(),
                show.adult(),
                show.overview(),
                show.originalLanguage(),
                imageUrlBuilder.buildPosterUrl(show.posterPath(), imageCfg, "w500"),
                imageUrlBuilder.buildBackdropUrl(show.backdropPath(), imageCfg, "w1280"),
                mapGenres(show.genreIds(), genreMap),
                show.voteAverage()
        );
    }

    private List<String> mapGenres(List<Integer> genreIds, Map<Integer, String> genreMap) {
        return genreIds.stream()
                .map(genreMap::get)
                .filter(Objects::nonNull)
                .toList();
    }
}