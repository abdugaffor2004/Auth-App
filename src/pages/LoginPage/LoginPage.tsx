import { Alert, Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { FC } from 'react';
import style from './LoginPage.module.css';
import { useAuth } from './useAuth';

export const LoginPage: FC = () => {
  const { triggerLogin, authenticationError, isAuthenticationError, isAuthenticating } = useAuth();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Username is required'),
      password: isNotEmpty('Password is required'),
    },
  });

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={form.onSubmit(formData => triggerLogin(formData))}>
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
          <Button loading={isAuthenticating} className={style.submitBtn} type="submit">
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
