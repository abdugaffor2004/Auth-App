import { getAccessToken } from '../lib/storage/tokens';
import { User } from '../types';

export const getCurrentUser = async (): Promise<User> => {
  const accessToken = getAccessToken();
  const response = await fetch('https://dummyjson.com/auth/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error('Authorization error');
  return response.json();
};
