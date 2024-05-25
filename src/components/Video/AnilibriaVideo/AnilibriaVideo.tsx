import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import VideoPlayer from "@/components/Video/VideoPlayer/VideoPlayer";
import {AspectRatio, Skeleton} from "@mantine/core";

export default function AnilibriaVideo({ id }: { id: string }) {
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'anilibria', id],
        queryFn: async () => getAnilibriaData(),
    });

    async function getAnilibriaData() {
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
        return <>К сожалению, онлайн просмотр данного аниме через наш плеер не доступен. Попробуйте выбрать другой!</>;
    }

    return (
        <AspectRatio ratio={16 / 9}>
            <VideoPlayer title={data?.names.ru} player={player} />
        </AspectRatio>
    );
}