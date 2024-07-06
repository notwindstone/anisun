"use server";

import type {Metadata} from "next";
import {Container} from "@mantine/core";
import classes from './page.module.css';
import AdvancedSearch from "@/components/AdvancedSearch/AdvancedSearch";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const translate = await getTranslations('Translations');

    const title = translate('page__titles__titles-title');
    const description = translate('page__titles__titles-description');

    return {
        title: title,
        description: description,
        openGraph: {
            siteName: 'Anisun',
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