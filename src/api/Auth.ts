import { AuthenticateRequest, AuthenticateResponse, User } from '../types';

export const authenticateUser = async (
  payload: AuthenticateRequest,
): Promise<AuthenticateResponse> => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Invalid password or username');
  return await response.json();
};

export const authorizeUser = async (token: string | null): Promise<User> => {
  const response = await fetch('https://dummyjson.com/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Authorization error');
  return await response.json();
};

export const refreshAccessToken = async (
  refreshToken: string | null,
): Promise<AuthenticateResponse> => {
  const response = await fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) throw new Error('Token refresh error');
  return await response.json();
};
