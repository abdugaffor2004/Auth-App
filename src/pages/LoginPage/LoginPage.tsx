import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC } from 'react';
import style from './LoginPage.module.css';
import { useLocalStorage } from '@mantine/hooks';
import { AuthenticateRequest } from '../../types';

interface LoginPageProps {
  authorize: (accessToken: string) => void;
  authenticate: (payload: AuthenticateRequest) => void;
}

export const LoginPage: FC<LoginPageProps> = ({ authorize, authenticate }) => {
  const [accessToken] = useLocalStorage({ key: 'accessToken', defaultValue: '' });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (payload: AuthenticateRequest) => {
    await authenticate(payload);
    await authorize(accessToken);
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={form.onSubmit(handleSubmit)}>
        <Title size="h2" mb="lg">
          Log in
        </Title>

        <TextInput
          className={style.item}
          withAsterisk
          label="Username"
          placeholder="your@email.com"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />

        <PasswordInput
          className={style.item}
          withAsterisk
          label="Password"
          placeholder="1234"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <Group justify="flex-end" mt="md">
          <Button className={style.submitBtn} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};
