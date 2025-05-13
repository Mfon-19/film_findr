"use server";

import { authOptions } from "@/auth";
import {
  LoginRequest,
  LoginResponse,
  MovieDetails,
  MovieResult,
  RegisterRequest,
} from "./types";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";

const API_URL = "http://localhost:8080/api";

export async function login({ email, password }: LoginRequest) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result: LoginResponse = await response.json();

    return result;
  } catch (error) {
    console.error(`An error occurred while fetching user: ${error}`);
  }
}

export async function register({ email, password, username }: RegisterRequest) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    const result: LoginResponse = await response.json();

    return result;
  } catch (error) {
    console.error(`An error occurred while registering user: ${error}`);
  }
}

export async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      headers: {
        authorization: `Bearer ${token.accessToken}`,
      },
      method: "POST",
    });

    if (!response.ok) throw new Error("Refresh error");

    const data: LoginResponse = await response.json();

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + data.accessExpiresIn * 1000,
      refreshToken: data.refreshToken ?? token.refreshToken,
    };
  } catch (err) {
    console.error("Unable to refresh:", err);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}

export async function getTrendingMovies() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/trending`, {
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
      },
    });

    const result: MovieResult[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch trending movies: ${error}`);
  }
}

export async function getMovieById(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/movie-details`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      throw new Error("Error fetching movie details");
    }
    const result: MovieDetails = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch movie by id: ${error}`);
  }
}

export async function getMoviesById(ids: string[]) {
  try {
    const response = await Promise.all(ids.map((id) => getMovieById(id)));
    const movies = response.filter(
      (movie): movie is MovieDetails => movie !== undefined
    );
    return movies;
  } catch (error) {
    console.error(`Failed to fetch movies by id: ${error}`);
  }
}

export async function getTopRatedMovies() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/top-rated`, {
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching top rated movies");
    }

    const result: MovieResult[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch top rated movies: ${error}`);
  }
}
