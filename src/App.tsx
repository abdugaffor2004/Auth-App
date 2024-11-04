import { FC, useLayoutEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { useAuth } from './pages/LoginPage/useAuth';

export const App: FC = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate(!isAuth ? '/login' : '/main', { replace: true });
  }, [isAuth, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<ProfilePage />} />
    </Routes>
  );
};
