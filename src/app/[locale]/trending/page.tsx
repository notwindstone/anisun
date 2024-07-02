import {Metadata} from "next";
import Trending from "@/components/Trending/Trending";
import classes from './page.module.css';
import {Container} from "@mantine/core";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const translate = await getTranslations('Translations');

    const title = translate('page__trending__trending-title');
    const description = translate('page__trending__trending-description');

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

export default function Page() {
    return (
        <Container className={classes.container} size={1200}>
            <Trending />
        </Container>
    );
}