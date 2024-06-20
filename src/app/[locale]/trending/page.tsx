import {Metadata} from "next";
import Trending from "@/components/Trending/Trending";
import classes from './page.module.css';
import {Container} from "@mantine/core";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const translate = await getTranslations('Translations');

    const title = translate('page-trending-title');
    const description = translate('page-trending-description');

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

export default function Page() {
    return (
        <Container className={classes.container} size={1200}>
            <Trending />
        </Container>
    );
}