package com.example.film_findr.tmdb.service;

import com.example.film_findr.exceptions.DownstreamServiceException;
import com.example.film_findr.tmdb.dto.*;
import com.example.film_findr.tmdb.dto.movie.*;
import com.example.film_findr.tmdb.dto.tv.*;
import jakarta.persistence.Cacheable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TmdbService {

    private final WebClient webClient;
    private final MediaEnricher mediaEnricher;
    private final ImageUrlBuilder imageUrlBuilder;

    @Value("${tmdb.api.key}")
    private String apiKey;

    public TmdbService(WebClient.Builder builder, MediaEnricher mediaEnricher, ImageUrlBuilder imageUrlBuilder) {
        this.webClient = builder.baseUrl("https://api.themoviedb.org/3").build();
        this.mediaEnricher = mediaEnricher;
        this.imageUrlBuilder = imageUrlBuilder;
    }

    public Mono<List<MovieResult>> getMovies(String endpoint, Object... uriVariables) {
        return webClient.get()
                .uri(endpoint, uriVariables)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ApiResponse<MovieResult>>() {})
                .map(ApiResponse::results)
                .onErrorMap(this::handleWebClientError);
    }

    public Mono<List<TvResult>> getTvShows(String endpoint, Object... uriVariables) {
        return webClient.get()
                .uri(endpoint, uriVariables)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ApiResponse<TvResult>>() {})
                .map(ApiResponse::results)
                .onErrorMap(this::handleWebClientError);
    }

    public Mono<List<MovieResult>> getTrendingMovies() {
        return getMovies("/trending/movie/day?api_key={apiKey}", apiKey);
    }

    public Mono<List<MovieResult>> getTopRatedMovies() {
        return getMovies("/movie/top_rated?api_key={apiKey}", apiKey);
    }

    public Mono<List<MovieResult>> getSimilarMovies(String movieId) {
        return getMovies("/movie/{movieId}/similar?api_key={apiKey}", movieId, apiKey);
    }

    public Mono<List<MovieResult>> discoverMovies(String page) {
        return getMovies("/discover/movie?language=en-US&api_key={apiKey}&page={page}", apiKey, page);
    }

    public Mono<List<MovieResult>> searchMovies(String query) {
        return getMovies("/search/movie?query={query}&include_adult=false&language=en-US&page=1&api_key={apiKey}", query, apiKey);
    }

    public Mono<List<TvResult>> getTrendingShows() {
        return getTvShows("/trending/tv/day?api_key={apiKey}", apiKey);
    }

    public Mono<List<TvResult>> getTopRatedShows() {
        return getTvShows("/tv/top_rated?api_key={apiKey}", apiKey);
    }

    public Mono<List<TvResult>> getSimilarShows(String showId) {
        return getTvShows("/tv/{showId}/similar?api_key={apiKey}", showId, apiKey);
    }

    public Mono<List<TvResult>> discoverShows(String page) {
        return getTvShows("/discover/tv?language=en-US&api_key={apiKey}&page={page}", apiKey, page);
    }

    public Mono<List<TvResult>> searchShows(String query) {
        return getTvShows("/search/tv?query={query}&include_adult=false&language=en-US&page=1&api_key={apiKey}", query, apiKey);
    }

    public Mono<List<MovieResultEnriched>> getEnrichedMovies(Mono<List<MovieResult>> moviesMono) {
        return Mono.zip(moviesMono, genreMap(), fetchImageConfig())
                .map(tuple -> {
                    List<MovieResult> movies = tuple.getT1();
                    Map<Integer, String> genreMap = tuple.getT2();
                    ImagesCfg imageCfg = tuple.getT3();

                    return movies.stream()
                            .map(movie -> mediaEnricher.enrichMovie(movie, genreMap, imageCfg))
                            .toList();
                });
    }

    public Mono<List<TvResultEnriched>> getEnrichedTvShows(Mono<List<TvResult>> showsMono) {
        return Mono.zip(showsMono, genreMap(), fetchImageConfig())
                .map(tuple -> {
                    List<TvResult> shows = tuple.getT1();
                    Map<Integer, String> genreMap = tuple.getT2();
                    ImagesCfg imageCfg = tuple.getT3();

                    return shows.stream()
                            .map(show -> mediaEnricher.enrichTvShow(show, genreMap, imageCfg))
                            .toList();
                });
    }

    public Mono<List<MovieResultEnriched>> getTrendingMoviesEnriched() {
        return getEnrichedMovies(getTrendingMovies());
    }

    public Mono<List<MovieResultEnriched>> getTopRatedMoviesEnriched() {
        return getEnrichedMovies(getTopRatedMovies());
    }

    public Mono<List<MovieResultEnriched>> getSimilarMoviesEnriched(String movieId) {
        return getEnrichedMovies(getSimilarMovies(movieId));
    }

    public Mono<List<MovieResultEnriched>> discoverMoviesEnriched(String page) {
        return getEnrichedMovies(discoverMovies(page));
    }

    public Mono<List<MovieResultEnriched>> searchMoviesEnriched(String query) {
        return getEnrichedMovies(searchMovies(query));
    }

    public Mono<List<TvResultEnriched>> getTrendingShowsEnriched() {
        return getEnrichedTvShows(getTrendingShows());
    }

    public Mono<List<TvResultEnriched>> getTopRatedShowsEnriched() {
        return getEnrichedTvShows(getTopRatedShows());
    }

    public Mono<List<TvResultEnriched>> getSimilarShowsEnriched(String showId) {
        return getEnrichedTvShows(getSimilarShows(showId));
    }

    public Mono<List<TvResultEnriched>> discoverShowsEnriched(String page) {
        return getEnrichedTvShows(discoverShows(page));
    }

    public Mono<List<TvResultEnriched>> searchShowsEnriched(String query) {
        return getEnrichedTvShows(searchShows(query));
    }

    public Mono<MovieDetailsResult> getMovieById(String movieId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{id}")
                        .queryParam("api_key", apiKey)
                        .build(movieId))
                .retrieve()
                .bodyToMono(MovieDetailsResult.class)
                .onErrorMap(this::handleWebClientError);
    }

    public Mono<MovieDetailsResultEnriched> getMovieByIdEnriched(String movieId) {
        return Mono.zip(getMovieById(movieId), fetchImageConfig())
                .map(tuple -> {
                    MovieDetailsResult movie = tuple.getT1();
                    ImagesCfg imgCfg = tuple.getT2();

                    return new MovieDetailsResultEnriched(
                            movie.id(), movie.title(), movie.overview(), movie.adult(),
                            movie.runtime(),
                            imageUrlBuilder.buildBackdropUrl(movie.backdropPath(), imgCfg, "w1280"),
                            imageUrlBuilder.buildPosterUrl(movie.posterPath(), imgCfg, "w500"),
                            movie.releaseDate(), movie.voteAverage(),
                            movie.genres().stream().map(GenreDTO::name).toList(),
                            movie.spokenLanguages().stream()
                                    .map(Language::englishName)
                                    .findFirst()
                                    .orElse(null)
                    );
                });
    }

    public Mono<TvDetails> getShowById(String showId) {
        return webClient.get()
                .uri("/tv/{showId}?language=en-US&api_key={apiKey}", showId, apiKey)
                .retrieve()
                .bodyToMono(TvDetails.class)
                .onErrorMap(this::handleWebClientError);
    }

    public Mono<TvDetailsEnriched> getShowByIdEnriched(String showId) {
        return Mono.zip(getShowById(showId), fetchImageConfig())
                .map(tuple -> {
                    TvDetails show = tuple.getT1();
                    ImagesCfg imgCfg = tuple.getT2();

                    return new TvDetailsEnriched(
                            show.id(), show.name(), show.adult(), show.overview(), show.createdBy(),
                            show.firstAirDate(), show.lastAirDate(), show.numberOfEpisodes(),
                            show.numberOfSeasons(), show.originalLanguage(),
                            imageUrlBuilder.buildPosterUrl(show.posterPath(), imgCfg, "w500"),
                            imageUrlBuilder.buildBackdropUrl(show.backdropPath(), imgCfg, "w1280"),
                            show.genres().stream().map(GenreDTO::name).toList(),
                            show.voteAverage(), show.status()
                    );
                });
    }

    //@Cacheable("movieGenres")
    public Mono<Map<Integer, String>> genreMap() {
        return webClient.get()
                .uri("/genre/movie/list?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(GenreList.class)
                .map(gl -> gl.genres().stream()
                        .collect(Collectors.toMap(GenreDTO::id, GenreDTO::name)))
                .onErrorMap(this::handleWebClientError);
    }

    //@Cacheable("tmdbConfig")
    public Mono<ImagesCfg> fetchImageConfig() {
        return webClient.get()
                .uri("/configuration?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(CfgResponse.class)
                .map(CfgResponse::images)
                .onErrorMap(this::handleWebClientError);
    }

    private Throwable handleWebClientError(Throwable ex) {
        if (ex instanceof WebClientResponseException wcEx) {
            return new DownstreamServiceException(
                    wcEx.getStatusCode().value(),
                    wcEx.getResponseBodyAsString()
            );
        }
        return ex;
    }
}

