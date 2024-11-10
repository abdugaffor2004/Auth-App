import { FC, useLayoutEffect } from 'react';
import { Outlet, RouterProvider, useNavigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './pages/LoginPage/useAuth';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Center, Loader, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthWrapper />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'main', element: <ProfilePage /> },
    ],
  },
]);

function AuthWrapper() {
  const { isAuth, isUserLoading } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate(isAuth ? '/main' : '/login', { replace: true });
  }, [isAuth, navigate]);

  if (isUserLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return <Outlet />;
}

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </QueryClientProvider>
);
