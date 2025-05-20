import { UUID } from "crypto";
import "next-auth";

export interface Movie {
  id: number;
  title: string;
  alt: string;
  imgSrc: string;
  overview: string;
}

export interface MovieResult extends Movie {
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: string[];
}

export interface MovieDetails extends MovieResult {
  adult: boolean;
  runtime: number;
  backdropPath: string;
  genres: string[];
  language: string;
}

export interface User {
  id: UUID;
  username: string;
  email: string;
  roles: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessExpiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  user: User;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessTokenExpires?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      username?: string;
    };
  }

  interface User {
    accessToken?: string;
    accessTokenExpires?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
  }
}

export interface Show {
  id: number;
  name: string;
  adult: boolean;
  overview: string;
  originalLanguage: string;
  posterPath: string;
  backdropPath: string;
  alt?: string;
  genres: string[];
  voteAverage: number;
}

export interface ShowDetails extends Show {
  createdBy: CreatedBy[];
  firstAirDate: string;
  lastAirDate: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  status: string;
}

interface CreatedBy {
  name: string;
}