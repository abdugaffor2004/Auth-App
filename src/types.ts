export interface AuthenticateRequest {
  username: string;
  password: string;
}

export interface AuthenticateResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id?: number;
  age?: number;
  birthDate?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  username: string;
  gender?: string;
  phone?: string;
  eyeColor?: string;
  role?: string;
}
