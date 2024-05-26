import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import VideoPlayer from "@/components/Video/VideoPlayer/VideoPlayer";
import {AspectRatio, Skeleton} from "@mantine/core";
import getShikimoriDataForAnilibriaQuery from "@/utils/Misc/getShikimoriDataForAnilibriaQuery";
import VideoNotFound from "@/components/Video/VideoNotFound";

export default function AnilibriaVideo({ id }: { id: string }) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'anilibria', id],
        queryFn: async () => getAnilibriaData(),
    });

    async function getAnilibriaData() {
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
                filter: 'names,player',
                limit: 1,
            }
        );

        if (!anilibriaData) {
            return null;
        }

        return anilibriaData;
    }

    if (isPending) {
        return (
            <AspectRatio ratio={16 / 9}>
                <Skeleton
                    height="100%"
                    width="100%"
                    radius="md"
                />
            </AspectRatio>
        );
    }

    if (error) {
        return <>Что-то пошло не так... Попробуйте перезапустить сайт. Ошибка: {error.message}</>;
    }

    const player = data?.player;

    if (player?.list?.[1]?.episode === undefined || player?.list?.[1]?.hls === undefined) {
        return <VideoNotFound />;
    }

    return (
        <AspectRatio ratio={16 / 9}>
            <VideoPlayer title={data?.names.ru} player={player} />
        </AspectRatio>
    );
}