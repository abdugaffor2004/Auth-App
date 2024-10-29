import { Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, useState } from 'react';
import style from './LoginPage.module.css';

interface RequestData {
  userName: string;
  password: string;
}

export const LoginPage: FC = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      userName: '',
      password: '',
    },
  });

  const [requestData, setRequestData] = useState<null | RequestData>(null);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={form.onSubmit(setRequestData)}>
        <Title size="h2" mb="lg">
          Log in
        </Title>

        <TextInput
          className={style.item}
          withAsterisk
          label="Username"
          placeholder="your@email.com"
          key={form.key('userName')}
          {...form.getInputProps('userName')}
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
