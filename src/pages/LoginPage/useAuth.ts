import { useLocalStorage } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthenticateRequest, User } from '../../types';
import { login } from '../../api/login';
import { getCurrentUser } from '../../api/getCurrentUser';
import { refresh } from '../../api/refresh';

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
    mutate: triggerLogin,
    error: authenticationError,
    isError: isAuthenticationError,
    isPending: isAuthenticating,
  } = useMutation({
    mutationKey: ['authentication'],
    mutationFn: async (payload: AuthenticateRequest) => {
      const data = await login(payload);
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
  } = useQuery<User | null>({
    queryKey: ['user', accessToken],
    queryFn: async () => (accessToken ? await getCurrentUser(accessToken) : null),
    retry: false,
  });

  const { mutate: triggerRefresh } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async () => await refresh(refreshToken),
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
      triggerRefresh();
    }
  }, [accessToken, triggerRefresh]);

  return {
    user,
    isAuth: !!user,
    triggerLogin,
    logout,
    isUserLoading,
    authenticationError,
    isAuthenticationError,
    isAuthenticating,
  };
};
