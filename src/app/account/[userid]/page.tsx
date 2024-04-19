import React from 'react';
import {Text} from "@mantine/core";
import {clerkClient} from "@clerk/nextjs";
import Account from "@/components/Account/Account";

export default async function Page({ params }: { params: { userid: string } }) {
    const user = await clerkClient.users.getUser(params.userid);

    if (!user) {
        return
    }

    const userObject = JSON.parse(JSON.stringify(user))

    return (
        <>
            <Text>{params.userid}</Text>
            <Account user={userObject} />
        </>
    );
}