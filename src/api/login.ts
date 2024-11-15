import { AuthenticateRequest, AuthenticateResponse } from '../types';

export const login = async (payload: AuthenticateRequest): Promise<AuthenticateResponse> => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Invalid password or username');
  return response.json();
};