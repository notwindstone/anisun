"use server";

import type {Metadata} from "next";
import {Container} from "@mantine/core";
import classes from './page.module.css';
import AdvancedSearch from "@/components/AdvancedSearch/AdvancedSearch";

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Поиск аниме';
    const description = 'Поиск по аниме сериалам и фильмам через Shikimori API';

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

export default async function Page() {
    return (
        <Container className={classes.container} size={1200}>
            <AdvancedSearch />
        </Container>
    );
}