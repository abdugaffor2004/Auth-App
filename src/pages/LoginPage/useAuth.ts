import { useLocalStorage } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authenticateUser, authorizeUser, refreshAccessToken } from '../../api/Auth';
import { AuthenticateRequest } from '../../types';

export const useAuth = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>({
    key: 'accessToken',
    defaultValue: null,
  });
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>({
    key: 'refreshToken',
    defaultValue: null,
  });

  const isTokenExpired = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  };

  const {
    mutate: login,
    error: authenticationError,
    isError: isAuthenticationError,
  } = useMutation({
    mutationKey: ['authentication'],
    mutationFn: async (payload: AuthenticateRequest) => {
      const data = await authenticateUser(payload);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },

    onSuccess: async () => {
      await refetchUser();
      navigate('/main', { replace: true });
    },
  });

  const {
    data: user,
    refetch: refetchUser,
    isPending: isUserLoading,
  } = useQuery({
    queryKey: ['user', accessToken],
    queryFn: async () => await authorizeUser(accessToken),
    retry: false,
  });

  const { mutate: refresh } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async () => await refreshAccessToken(refreshToken),
    onSuccess: data => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    onError: () => logout(),
  });

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (accessToken && isTokenExpired(accessToken)) {
      refresh();
    }
  }, [accessToken, refresh]);

  return {
    user,
    isAuth: !!user,
    login,
    logout,
    isUserLoading,
    authenticationError,
    isAuthenticationError,
  };
};
