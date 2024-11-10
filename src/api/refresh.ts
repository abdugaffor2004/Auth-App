import { AuthenticateResponse } from '../types';

export const refresh = async (refreshToken: string | null): Promise<AuthenticateResponse> => {
  const response = await fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) throw new Error('Token refresh error');
  return await response.json();
};