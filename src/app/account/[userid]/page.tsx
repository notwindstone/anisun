import React from 'react';
import {Avatar, Text} from "@mantine/core";
import {clerkClient} from "@clerk/nextjs";

export default async function Page({ params }: { params: { userid: string } }) {
    const user = await clerkClient.users.getUser(params.userid);
    console.log(user)
    return (
        <>
            <Text>{params.userid}</Text>
            <Avatar size={64} src={user.imageUrl} />
        </>
    );
}