import { FC } from 'react';
import { User } from '../../types';
import { Center, Flex, Image, Paper, Text, Title } from '@mantine/core';
import style from './ProfilePage.module.css';

interface ProfilePageProps {
  user: User | null;
  logout: () => void;
}

export const ProfilePage: FC<ProfilePageProps> = ({ user, logout }) => {
  return (
    <>
      <Flex my="md" mr="lg" justify="end">
        <a style={{ cursor: 'pointer' }} onClick={logout}>
          Log out
        </a>
      </Flex>

      <Center h="60vh">
        <Flex mr="lg" align="center" direction="column">
          <Image w="180px" src={user?.image} alt="Avatar" />
          <Flex c="#3d3d3d" align="center">
            <Title size="h2">{user?.username}</Title>
            <Text ml="8px" size="24px">
              • {user?.age} y.o.
            </Text>
          </Flex>
        </Flex>

        <Paper radius="15px" c="#3d3d3d" bg="#fff" className={style.paper}>
          <Flex direction="column">
            <Title size="h3">Personal Info</Title>
            <Flex mt="28px" justify="space-between">
              <Flex direction="column">
                <Text c="gray" mb="xs" size="16px">
                  Full Name
                </Text>
                <Title size="h6">
                  {user?.firstName} {user?.lastName}{' '}
                </Title>
              </Flex>
              <Flex direction="column">
                <Text c="gray" mb="xs" size="16px">
                  Email
                </Text>
                <Title size="h6">{user?.email} </Title>
              </Flex>
              <Flex direction="column">
                <Text c="gray" mb="xs" size="16px">
                  Phone
                </Text>
                <Title size="h6">{user?.phone} </Title>
              </Flex>
            </Flex>
          </Flex>
        </Paper>
      </Center>
    </>
  );
};
