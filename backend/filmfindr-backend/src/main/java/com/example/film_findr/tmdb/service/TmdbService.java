package com.example.film_findr.tmdb.service;

import com.example.film_findr.exceptions.DownstreamServiceException;
import com.example.film_findr.tmdb.dto.*;
import com.example.film_findr.tmdb.dto.movie.*;
import com.example.film_findr.tmdb.dto.tv.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${tmdb.api.key}")
    private String apiKey;

    public TmdbService(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://api.themoviedb.org/3").build();
    }

    public Mono<List<MovieResult>> getTrendingMovies() {
        return webClient.get()
                .uri("/trending/movie/day?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TrendingMovieResponse.class)
                .map(TrendingMovieResponse::results);
    }

    public Mono<List<MovieResult>> getTopRatedMovies() {
        return webClient.get()
                .uri("/movie/top_rated?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TrendingMovieResponse.class)
                .map(TrendingMovieResponse::results);
    }

    public Mono<List<MovieResult>> getSimilarMovies(String movieId) {
        return webClient.get()
                .uri("/movie/{movieId}/similar?api_key={apiKey}", movieId, apiKey)
                .retrieve()
                .bodyToMono(TrendingMovieResponse.class)
                .map(TrendingMovieResponse::results);
    }

    public Mono<List<TvResult>> getSimilarShows(String showId) {
        return webClient.get()
                .uri("/tv/{showId}/similar?api_key={apiKey}", showId, apiKey)
                .retrieve()
                .bodyToMono(TrendingTvResponse.class)
                .map(TrendingTvResponse::results);
    }

    //@Cacheable("movieGenres")
    public Mono<Map<Integer, String>> genreMap() {
        return webClient.get()
                .uri("/genre/movie/list?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(GenreList.class)
                .map(gl -> gl.genres().stream().collect(Collectors.toMap(
                                        GenreDTO::id,
                                        GenreDTO::name)));
    }

    public Mono<List<MovieResultEnriched>> trendingWithNames() {
        return Mono.zip(getTrendingMovies(), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var list = tuple.getT1();
                    var id2nm = tuple.getT2();
                    var imgCfg = tuple.getT3();
                    return list.stream()
                            .map(m -> new MovieResultEnriched(
                                    m.id(), m.title(), m.overview(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"), m.releaseDate(), m.voteAverage(),
                                    m.genreIds().stream().map(id2nm::get)
                                            .toList()
                            )).toList();
                });
    }

    public Mono<List<MovieResultEnriched>> similarMoviesWithNames(String movieId) {
        return Mono.zip(getSimilarMovies(movieId), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var list = tuple.getT1();
                    var id2nm = tuple.getT2();
                    var imgCfg = tuple.getT3();
                    return list.stream()
                            .map(m -> new MovieResultEnriched(
                                    m.id(), m.title(), m.overview(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"), m.releaseDate(), m.voteAverage(),
                                    m.genreIds().stream().map(id2nm::get)
                                            .toList()
                            )).toList();
                });
    }
    public Mono<List<MovieResultEnriched>> topRatedWithNames() {
        return Mono.zip(getTopRatedMovies(), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var list = tuple.getT1();
                    var id2nm = tuple.getT2();
                    var imgCfg = tuple.getT3();
                    return list.stream()
                            .map(m -> new MovieResultEnriched(
                                    m.id(), m.title(), m.overview(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"), m.releaseDate(), m.voteAverage(),
                                    m.genreIds().stream().map(id2nm::get)
                                            .toList()
                            )).toList();
                });
    }
    //@Cacheable("tmdbConfig")
    public Mono<ImagesCfg> fetchImageConfig() {
        return webClient.get()
                .uri("/configuration?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(CfgResponse.class)
                .map(CfgResponse::images);
    }

    public String buildPosterUrl(String posterPath, ImagesCfg cfg, String preferredSize) {
        String size = cfg.posterSizes().contains(preferredSize)
                ? preferredSize
                : cfg.posterSizes().getLast();

        return cfg.secureBaseUrl() + size + posterPath;
    }

    public Mono<MovieDetailsResult> getMovieById(String movieId) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/movie/{id}")
                        .queryParam("api_key", apiKey)
                        .build(movieId))
                .retrieve()
                .bodyToMono(MovieDetailsResult.class)
                .onErrorMap(
                        WebClientResponseException.class,
                        ex -> new DownstreamServiceException(
                                ex.getStatusCode().value(), ex.getResponseBodyAsString()
                        )
                );
    }

    public Mono<MovieDetailsResultEnriched> moviesByIdWithPoster(String movieId) {
        return Mono.zip(getMovieById(movieId), fetchImageConfig())
                .map(tuple -> {
                    var movie = tuple.getT1();
                    var imgCfg = tuple.getT2();
                    return new MovieDetailsResultEnriched(
                            movie.id(), movie.title(), movie.overview(), movie.adult(),
                            movie.runtime(), buildPosterUrl(movie.backdropPath(), imgCfg, "w1280"),
                            buildPosterUrl(movie.posterPath(), imgCfg, "w500"), movie.releaseDate(),
                            movie.voteAverage(), movie.genres().stream().map(GenreDTO::name).toList(),
                            movie.spokenLanguages().stream().map(Language::englishName).toList().stream().findFirst().orElse(null)
                    );
                });
    }

    public Mono<List<TvResult>> getTrendingShows() {
        return webClient.get()
                .uri("/trending/tv/day?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TrendingTvResponse.class)
                .map(TrendingTvResponse::results);
    }

    public Mono<List<TvResultEnriched>> trendingShowsWithPosterAndNames() {
        return Mono.zip(getTrendingShows(), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var show = tuple.getT1();
                    var genre = tuple.getT2();
                    var imgCfg = tuple.getT3();

                    return show.stream()
                            .map(m -> new TvResultEnriched(
                                    m.id(), m.name(), m.adult(),
                                    m.overview(), m.originalLanguage(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"),
                                    buildPosterUrl(m.backdropPath(), imgCfg, "w1280"),
                                    m.genreIds().stream().map(genre::get).toList(), m.voteAverage()
                            )).toList();
                });
    }

    public Mono<List<TvResult>> getTopRatedShows() {
        return webClient.get()
                .uri("/tv/top_rated?api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TrendingTvResponse.class)
                .map(TrendingTvResponse::results);
    }

    public Mono<List<TvResultEnriched>> topRatedShowsWithPosterAndNames() {
        return Mono.zip(getTopRatedShows(), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var show = tuple.getT1();
                    var genre = tuple.getT2();
                    var imgCfg = tuple.getT3();

                    return show.stream()
                            .map(m -> new TvResultEnriched(
                                    m.id(), m.name(), m.adult(),
                                    m.overview(), m.originalLanguage(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"),
                                    buildPosterUrl(m.backdropPath(), imgCfg, "w1280"),
                                    m.genreIds().stream().map(genre::get).toList(), m.voteAverage()
                            )).toList();
                });
    }

    public Mono<List<TvResultEnriched>> similarShowsWithnames(String id) {
        return Mono.zip(getSimilarShows(id), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var show = tuple.getT1();
                    var genre = tuple.getT2();
                    var imgCfg = tuple.getT3();

                    return show.stream()
                            .map(m -> new TvResultEnriched(
                                    m.id(), m.name(), m.adult(),
                                    m.overview(), m.originalLanguage(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"),
                                    buildPosterUrl(m.backdropPath(), imgCfg, "w1280"),
                                    m.genreIds().stream().map(genre::get).toList(), m.voteAverage()
                            )).toList();
                });
    }
    public Mono<TvDetails> getShowById(String showId) {
        return webClient.get()
                .uri("https://api.themoviedb.org/3/tv/{showId}?language=en-US&api_key={apiKey}", showId, apiKey)
                .retrieve()
                .bodyToMono(TvDetails.class);
    }

    public Mono<TvDetailsEnriched> showByIdWithPoster(String showId) {
        return Mono.zip(getShowById(showId), fetchImageConfig())
                .map(tuple -> {
                    var show = tuple.getT1();
                    var imgCfg = tuple.getT2();
                    return new TvDetailsEnriched(
                            show.id(), show.name(), show.adult(), show.overview(), show.createdBy(),
                            show.firstAirDate(), show.lastAirDate(), show.numberOfEpisodes(), show.numberOfSeasons(),
                            show.originalLanguage(), buildPosterUrl(show.posterPath(), imgCfg, "w500"),
                            buildPosterUrl(show.backdropPath(), imgCfg, "w1280"), show.genres().stream().map(GenreDTO::name).toList(),
                            show.voteAverage(), show.status()
                    );
                });
    }

    public Mono<List<MovieResult>> discoverMovies() {
        return webClient.get()
                .uri("/discover/movie?language=en-US&api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(DiscoverMovieResponse.class)
                .map(DiscoverMovieResponse::results);
    }

    public Mono<List<MovieResultEnriched>> discoverMoviesWithNames() {
        return Mono.zip(discoverMovies(), fetchImageConfig(), genreMap())
                .map(tuple -> {
                    var movie = tuple.getT1();
                    var imgCfg = tuple.getT2();
                    var genre = tuple.getT3();

                    return movie.stream()
                            .map(m -> new MovieResultEnriched(
                                    m.id(), m.title(), m.overview(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"), m.releaseDate(), m.voteAverage(),
                                    m.genreIds().stream().map(genre::get)
                                            .toList()
                            )).toList();
                });
    }

    public Mono<List<TvResult>> discoverShows() {
        return webClient.get()
                .uri("/discover/tv?language=en-US&api_key={apiKey}", apiKey)
                .retrieve()
                .bodyToMono(TrendingTvResponse.class)
                .map(TrendingTvResponse::results);
    }

    public Mono<List<TvResultEnriched>> discoverShowsWithNames() {
        return Mono.zip(discoverShows(), fetchImageConfig(), genreMap())
                .map(tuple -> {
                    var show = tuple.getT1();
                    var imgCfg = tuple.getT2();
                    var genre = tuple.getT3();

                    return show.stream()
                            .map(s -> new TvResultEnriched(
                                    s.id(), s.name(), s.adult(), s.overview(), s.originalLanguage(),
                                    buildPosterUrl(s.posterPath(), imgCfg, "w500"),
                                    buildPosterUrl(s.backdropPath(), imgCfg, "w1280"),
                                    s.genreIds().stream().map(genre::get)
                                            .toList(), s.voteAverage()
                            )).toList();
                });
    }

    public Mono<List<MovieResult>> searchMovies(String query){
        return webClient.get()
                .uri("/search/movie?query={query}&include_adult=false&language=en-US&page=1&api_key={apiKey}", query, apiKey)
                .retrieve()
                .bodyToMono(TrendingMovieResponse.class)
                .map(TrendingMovieResponse::results);
    }

    public Mono<List<MovieResultEnriched>> searchMoviesWithNames(String query) {
        return Mono.zip(searchMovies(query), fetchImageConfig(), genreMap())
                .map(tuple -> {
                    var movie = tuple.getT1();
                    var imgCfg = tuple.getT2();
                    var genre = tuple.getT3();

                    return movie.stream()
                            .map(m -> new MovieResultEnriched(
                                    m.id(), m.title(), m.overview(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"), m.releaseDate(), m.voteAverage(),
                                    m.genreIds().stream().map(genre::get)
                                            .toList()
                            )).toList();
                });
    }

    public Mono<List<TvResult>> searchShows(String query){
        return webClient.get()
                .uri("/search/tv?query={query}&include_adult=false&language=en-US&page=1&api_key={apiKey}", query, apiKey)
                .retrieve()
                .bodyToMono(TrendingTvResponse.class)
                .map(TrendingTvResponse::results);
    }

    public Mono<List<TvResultEnriched>> searchShowsWithNames(String query) {
        return Mono.zip(searchShows(query), genreMap(), fetchImageConfig())
                .map(tuple -> {
                    var show = tuple.getT1();
                    var genre = tuple.getT2();
                    var imgCfg = tuple.getT3();

                    return show.stream()
                            .map(m -> new TvResultEnriched(
                                    m.id(), m.name(), m.adult(),
                                    m.overview(), m.originalLanguage(),
                                    buildPosterUrl(m.posterPath(), imgCfg, "w500"),
                                    buildPosterUrl(m.backdropPath(), imgCfg, "w1280"),
                                    m.genreIds().stream().map(genre::get).toList(), m.voteAverage()
                            )).toList();
                });
    }
}
