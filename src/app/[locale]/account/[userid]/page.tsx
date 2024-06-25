import React from 'react';
import {Center, Container, Text} from "@mantine/core";
import {clerkClient} from "@clerk/nextjs/server";
import Account from "@/components/Account/Account";
import {Metadata} from "next";
import classes from './page.module.css';
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const translate = await getTranslations('Translations');

    const title = translate('page__account__metadata-title');
    const description = translate('page__account__metadata-description');

    return {
        title: title,
        description: description,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: title,
            description: description,
        }
    };
}

export default async function Page({ params }: { params: { userid: string } }) {
    let user;

    const info = await getTranslations('Info');
    const translate = await getTranslations('Translations');
    const locale = info('locale');

    let message;

    switch (locale) {
        case "en":
            message = translate('common__account-not-found-label');
            break;
        case "ru":
            message = translate('common__account-not-found-label');
            break;
        default:
            message = translate('common__account-not-found-label');
            break;
    }

    try {
        user = await clerkClient.users.getUser(params.userid);
    } catch (error) {
        return (
            <Center h="calc(100vh - 1px)">
                <Text>
                    {message}
                </Text>
            </Center>
        );
    }

    const userObject = JSON.parse(JSON.stringify(user));

    return (
        <Container className={classes.container} size={1200}>
            <Account user={userObject} />
        </Container>
    );
}