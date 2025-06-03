package com.example.film_findr.tmdb.service;

import com.example.film_findr.tmdb.dto.ImagesCfg;
import org.springframework.stereotype.Component;

@Component
public class ImageUrlBuilder {

    public String buildPosterUrl(String posterPath, ImagesCfg cfg, String preferredSize) {
        if (posterPath == null || posterPath.isEmpty()) {
            return null;
        }

        String size = cfg.posterSizes().contains(preferredSize)
                ? preferredSize
                : cfg.posterSizes().getLast();

        return cfg.secureBaseUrl() + size + posterPath;
    }

    public String buildBackdropUrl(String backdropPath, ImagesCfg cfg, String preferredSize) {
        if (backdropPath == null || backdropPath.isEmpty()) {
            return null;
        }
        return cfg.secureBaseUrl() + preferredSize + backdropPath;
    }
}