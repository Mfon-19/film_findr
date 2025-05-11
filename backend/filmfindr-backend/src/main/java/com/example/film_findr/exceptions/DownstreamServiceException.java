package com.example.film_findr.exceptions;

import lombok.Getter;

@Getter
public class DownstreamServiceException extends RuntimeException {
    private final int statusCode;
    private final String responseBody;

    public DownstreamServiceException(int statusCode, String responseBody) {
        super("Downstream service responded with HTTP " + statusCode);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }

    public DownstreamServiceException(int statusCode, String responseBody, Throwable cause) {
        super("Downstream service responded with HTTP " + statusCode, cause);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
