import { FC } from 'react';
import { LoginPage } from './pages/LoginPage';
import { MantineProvider } from '@mantine/core';

export const App: FC = () => (
  <MantineProvider>
    <LoginPage />
  </MantineProvider>
);
