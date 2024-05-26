import {IconDownload} from "@tabler/icons-react";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import {rem, Skeleton} from "@mantine/core";
import getShikimoriDataForAnilibriaQuery from "@/utils/Misc/getShikimoriDataForAnilibriaQuery";

export default function AnimeInfoDownloadVideo({ id }: { id: string }) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'download', id],
        queryFn: async () => getDownloadLinks(),
    });

    async function getDownloadLinks() {
        const {
            shikimoriOriginalName,
            shikimoriEnglishName,
            shikimoriRussianName,
            shikimoriYear,
            approximateDuration,
        } = await getShikimoriDataForAnilibriaQuery({ id });

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