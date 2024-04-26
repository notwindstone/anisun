import React from 'react';
import {Text} from "@mantine/core";
import {clerkClient} from "@clerk/nextjs";
import Account from "@/components/Account/Account";
import Link from "next/link";

export default async function Page({ params }: { params: { userid: string } }) {
    const user = await clerkClient.users.getUser(params.userid);

    if (!user) {
        return (
            <>
                <Link href="/">Вернуться</Link>
                <Text>Похоже, что такого пользователя не существует.</Text>
            </>
        )
    }

    const userObject = JSON.parse(JSON.stringify(user))

    return (
        <>
            <Link href="/">Return</Link>
            <Text>{params.userid}</Text>
            <Account user={userObject} />
        </>
    );
}