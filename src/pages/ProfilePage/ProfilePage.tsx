import { FC } from 'react';
import { Badge, Center, Flex, Image, Paper, Text, Title } from '@mantine/core';
import style from './ProfilePage.module.css';
import { useAuth } from '../LoginPage/useAuth';
import { User } from '../../types';

const defaultUser: User = {
  username: 'Unknown User',
  age: null,
  image: 'https://placehold.co/600x400/png',
};

const getUserData = (user?: User | null): User => ({
  ...defaultUser,
  ...user,
});

export const ProfilePage: FC = () => {
  const { user, logout } = useAuth();
  const { username, age, image, role, firstName, lastName, email, phone } = getUserData(user);

  return (
    <div className={style.container}>
      <Flex py="md" mr="lg" justify="end">
        <a onClick={logout}>Log out</a>
      </Flex>

      <Center mt="100px">
        <Flex mr="lg" align="center" direction="column">
          <Image w="180px" src={image} alt="Avatar" />
          <Flex c="#3d3d3d" align="center">
            <Title size="h2">{username}</Title>
            <Text ml="8px" size="24px">
              • {age} y.o.
            </Text>
          </Flex>
        </Flex>

        <Paper radius="15px" c="#3d3d3d" bg="#fff" className={style.paper}>
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Title size="h3">Personal Info</Title>
              <Badge size="md">{role}</Badge>
            </Flex>

            <Flex mt="28px" justify="space-between">
              <Flex direction="column">
                <Text c="gray" mb="xs" size="16px">
                  Full Name
                </Text>
                <Title size="h6">
                  {firstName} {lastName}
                </Title>
              </Flex>
              <Flex direction="column">
                <Text c="gray" mb="xs" size="16px">
                  Email
                </Text>
                <Title size="h6">{email} </Title>
              </Flex>
              <Flex direction="column">
                <Text c="gray" mb="xs" size="16px">
                  Phone
                </Text>
                <Title size="h6">{phone} </Title>
              </Flex>
            </Flex>
          </Flex>
        </Paper>
      </Center>
    </div>
  );
};
