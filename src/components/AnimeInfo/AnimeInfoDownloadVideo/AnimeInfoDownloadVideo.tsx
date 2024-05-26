import {IconDownload} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import {client} from "@/lib/shikimori/client";
import {rem, Skeleton} from "@mantine/core";

export default function AnimeInfoDownloadVideo({ id }: { id: string }) {
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'download', id],
        queryFn: async () => getDownloadLinks(),
    });

    async function getDownloadLinks() {
        const shikimoriAnime = (await shikimori.animes.byId({
            ids: id,
            filter: [
                "name",
                "english",
                "russian",
                "airedOn { year month day date }",
                "duration"
            ],
        })).animes[0];

        const shikimoriOriginalName = shikimoriAnime.name;
        const shikimoriEnglishName = shikimoriAnime.english;
        const shikimoriRussianName = shikimoriAnime.russian;
        const shikimoriYear = shikimoriAnime.airedOn?.year;
        const shikimoriDuration = shikimoriAnime.duration ?? 1;
        const approximateDuration = `(${shikimoriDuration - 1}, ${shikimoriDuration}, ${shikimoriDuration + 1})`;

        const anilibriaData = await anilibria.advancedSearch(
            {
                originalName: shikimoriOriginalName,
                englishName: shikimoriEnglishName,
                russianName: shikimoriRussianName,
                year: shikimoriYear,
                duration: approximateDuration,
                filter: 'player.host,player.list[*].hls,torrents',
                limit: 1,
            }
        );

        if (!anilibriaData) {
            return null;
        }

        return anilibriaData;
    }

    if (isPending) {
        return <Skeleton radius="xl" width={rem(126)} height={rem(36)} />;
    }

    if (error) {
        return <>Ошибка: {error.message}</>;
    }

    return (
        <DecoratedButton
            leftSection={<IconDownload />}
            onClick={() => console.log(data, isPending, error)}
        >
            Скачать
        </DecoratedButton>
    );
}