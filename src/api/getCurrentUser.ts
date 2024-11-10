import { User } from '../types';

export const getCurrentUser = async (token: string | null): Promise<User> => {
  const response = await fetch('https://dummyjson.com/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Authorization error');
  return await response.json();
};