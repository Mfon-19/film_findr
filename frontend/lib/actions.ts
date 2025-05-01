"use server";

import { LoginRequest, LoginResponse, RegisterRequest } from "./types";

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
