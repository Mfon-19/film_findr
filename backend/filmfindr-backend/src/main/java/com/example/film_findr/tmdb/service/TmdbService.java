package com.example.film_findr.tmdb.service;

import com.example.film_findr.tmdb.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
                .bodyToMono(TrendingResponse.class)
                .map(TrendingResponse::results);
    }

    //@Cacheable("movieGenres")
    public Mono<Map<Integer, String>> genreMap() {
        return webClient.get()
                .uri("/genre/movie/list")
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

    //@Cacheable("tmdbConfig")
    public Mono<ImagesCfg> fetchImageConfig() {
        return webClient.get()
                .uri("/configuration")
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
}
