import {Group, rem, Stack} from "@mantine/core";
import getShikimoriId from "@/utils/Misc/getShikimoriId";
import {client} from "@/lib/shikimori/client";
import {Metadata} from "next";
import Video from "@/components/Video/Video";
import AnimeInfo from "@/components/AnimeInfo/AnimeInfo";
import classes from './page.module.css';
import Recommendations from "@/components/Recommendations/Recommendations";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const shikimori = client();
    const shikimoriId = getShikimoriId(params.code);

    const info = await getTranslations('Info');
    const translate = await getTranslations('Translations');
    const locale = info('locale');

    const anime = (
        await shikimori
            .animes
            .byId({
                ids: shikimoriId,
                filter: [
                    'name',
                    'russian',
                    'english',
                    'description'
                ],
            })
    )?.animes[0];

    const placeholderTitle = translate('page-anime-placeholder-title');
    const placeholderDescription = translate('page-anime-placeholder-description');

    if (!anime) {
        return {
            title: placeholderTitle,
            description: placeholderDescription,
            openGraph: {
                siteName: 'Animeth',
                type: "website",
                title: placeholderTitle,
                description: placeholderDescription,
            }
        };
    }

    let animeName;

    switch (locale) {
        case "en":
            animeName = anime.english ?? anime.name;
            break;
        case "ru":
            animeName = anime.russian ?? anime.name;
            break;
        default:
            animeName = anime.name;
            break;
    }

    return {
        title: animeName ?? placeholderTitle,
        description: anime.description ?? placeholderDescription,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: animeName,
            description: anime.description ?? placeholderDescription,
        }
    };
}

export default function Page({ params }: { params: { code: string } }) {
    const shikimoriId = getShikimoriId(params.code);

    return (
        <>
            <Group
                className={classes.group}
                align="flex-start"
                gap={rem(16)}
            >
                <Stack className={classes.primary} flex={1}>
                    <Video id={shikimoriId} />
                    <AnimeInfo id={shikimoriId} titleCode={params.code} />
                </Stack>
                <Recommendations id={shikimoriId} />
            </Group>
        </>
    );
}