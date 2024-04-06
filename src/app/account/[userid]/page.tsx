import React from 'react';
import {Avatar, Text} from "@mantine/core";
import {clerkClient} from "@clerk/nextjs";
import Account from "@/components/Account/Account";

export default async function Page({ params }: { params: { userid: string } }) {
    const user = await clerkClient.users.getUser(params.userid);

    if (!user) {
        return
    }

    return (
        <>
            <Text>{params.userid}</Text>
            <Avatar size={64} src={user.imageUrl} />
            <Account userid={user.id} />
        </>
    );
}