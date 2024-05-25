import {Group, rem, Stack} from "@mantine/core";
import getShikimoriId from "@/utils/Misc/getShikimoriId";
import {client} from "@/lib/shikimori/client";
import {Metadata} from "next";
import Video from "@/components/Video/Video";
import AnimeInfo from "@/components/AnimeInfo/AnimeInfo";

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
    const shikimori = client();
    const shikimoriId = getShikimoriId(params.code);

    const anime = (
        await shikimori
            .animes
            .byId({
                ids: shikimoriId,
                filter: [
                    'name',
                    'russian',
                    'description'
                ],
            })
    ).animes[0];

    const placeholderTitle = 'Просмотр аниме на Animeth';
    const placeholderDescription = 'На сайте Animeth можно бесплатно и без рекламы смотреть аниме с субтитрами или озвучкой, которая выбирается в плеере';

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

    return {
        title: anime.russian ?? anime.name ?? placeholderTitle,
        description: anime.description ?? placeholderDescription,
        openGraph: {
            siteName: 'Animeth',
            type: "website",
            title: anime.russian ?? anime.name ?? placeholderTitle,
            description: anime.description ?? placeholderDescription,
        }
    };
}

export default function Page({ params }: { params: { code: string } }) {
    const shikimoriId = getShikimoriId(params.code);

    return (
        <>
            <Group
                align="flex-start"
                pt={rem(82)}
                pl={rem(16)}
                pr={rem(16)}
                gap={rem(16)}
            >
                <Stack
                    flex={6}
                >
                    <Video id={shikimoriId} />
                    <AnimeInfo id={shikimoriId} />
                </Stack>
                <Stack flex={2}>
                    <div>2</div>
                </Stack>
            </Group>
        </>
    );
}