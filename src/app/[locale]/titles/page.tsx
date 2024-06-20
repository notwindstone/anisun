"use server";

import type {Metadata} from "next";
import {Container} from "@mantine/core";
import classes from './page.module.css';
import AdvancedSearch from "@/components/AdvancedSearch/AdvancedSearch";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const translate = await getTranslations('Translations');

    const title = translate('page-titles-title');
    const description = translate('page-titles-description');

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