import { UUID } from "crypto";
import "next-auth";

export interface Movie {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  rating: number;
  overview: string;
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
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      username?: string;
    };
  }

  interface User {
    accessToken?: string;
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
