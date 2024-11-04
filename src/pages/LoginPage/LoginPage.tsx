import {
  Alert,
  Button,
  Center,
  Group,
  Loader,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC } from 'react';
import style from './LoginPage.module.css';
import { useAuth } from './useAuth';

export const LoginPage: FC = () => {
  const { login, authenticationError, isAuthenticationError, isUserLoading } = useAuth();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: value => !value && 'Username is required',
      password: value => !value && 'Password is required',
    },
  });

  if (isUserLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={form.onSubmit(formData => login(formData))}>
        <Title size="h2" mb="lg">
          Log in
        </Title>

        <TextInput
          className={style.item}
          withAsterisk
          label="Username"
          placeholder="emilys"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />

        <PasswordInput
          className={style.item}
          withAsterisk
          label="Password"
          placeholder="emylispass"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <Group justify="flex-end" mt="md">
          <Button className={style.submitBtn} type="submit">
            Submit
          </Button>
        </Group>
      </form>

      {isAuthenticationError && (
        <>
          <Alert
            px="60px"
            mt="md"
            title={authenticationError?.message || 'An unknown error occurred'}
            color="red"
          >
            Retry with correct credentials
          </Alert>
        </>
      )}
    </div>
  );
};
