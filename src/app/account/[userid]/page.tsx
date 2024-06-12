import React from 'react';
import {Container, Flex, rem, Skeleton, Stack, Text} from "@mantine/core";
import {clerkClient} from "@clerk/nextjs";
import Account from "@/components/Account/Account";
import {Metadata} from "next";
import classes from './page.module.css';

export const metadata: Metadata = {
    title: 'Аккаунт - Animeth',
    description: 'Страница с профилем пользователя',
};

export default async function Page({ params }: { params: { userid: string } }) {
    const user = await clerkClient.users.getUser(params.userid);

    if (!user) {
        return (
            <>
                <Text>Похоже, что такого пользователя не существует.</Text>
            </>
        );
    }

    const userObject = JSON.parse(JSON.stringify(user));

    return (
        <Container className={classes.container} size={1200}>
            <Account user={userObject} />
        </Container>
    );
}