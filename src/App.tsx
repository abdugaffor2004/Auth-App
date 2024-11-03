import { jwtDecode } from 'jwt-decode';
import { Route, Routes, useNavigate } from 'react-router';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Center, Loader } from '@mantine/core';
import { AuthenticateRequest } from './types';

export const App: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useLocalStorage({ key: 'accessToken', defaultValue: null });
  const [refreshToken, setRefreshToken] = useLocalStorage({
    key: 'refreshToken',
    defaultValue: null,
  });

  console.log(user);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return true;
    }
  };

  const authenticate = async (payload: AuthenticateRequest) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expiresInMins: 10, ...payload }),
    });

    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIsAuth(true);
    } else {
      setIsAuth(false);
      throw new Error('Ошибка аутентификации');
    }
  };

  const authorize = async (token: string) => {
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setUser(await response.json());
      setIsAuth(true);
    } else {
      setIsAuth(false);
      setAccessToken(null);
      setRefreshToken(null);
      throw new Error('Ошибка авторизации');
    }
  };

  const refreshAccessToken = useCallback(
    async (payload: string | null) => {
      if (!payload) return;
      const response = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: payload }),
      });
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      } else {
        setIsAuth(false);
        setAccessToken(null);
        setRefreshToken(null);
        navigate('/login');
        throw new Error('Ошибка обновления refresh токена. Возможно срок действия токена истекло');
      }
    },
    [setAccessToken, setRefreshToken, navigate],
  );

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuth(false);
    setUser(null);
    navigate('/login', { replace: true });
  };

  useLayoutEffect(() => {
    const checkAndAuthorize = async () => {
      setLoading(true);

      if (accessToken) {
        console.log(isTokenExpired(accessToken));
        if (isTokenExpired(accessToken)) {
          console.log('Токен истек. Обновляем токен...');
          await refreshAccessToken(refreshToken);
        }
        await authorize(accessToken);
      }
      setLoading(false);
      navigate(isAuth ? '/main' : '/login', { replace: true });
    };

    checkAndAuthorize();
  }, [isAuth, accessToken, refreshToken, navigate, refreshAccessToken]);

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage authorize={authorize} authenticate={authenticate} />}
      />
      <Route path="/main" element={<ProfilePage logout={logout} user={user} />} />
    </Routes>
  );
};
