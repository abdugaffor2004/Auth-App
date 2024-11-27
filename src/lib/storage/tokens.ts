export const getAccessToken = (): string | null => localStorage.getItem('accessToken');
export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);

export const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');
export const setRefeshToken = (token: string) => localStorage.setItem('refreshToken', token);

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
