import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {anilibria} from "@/lib/anilibria/anilibria";
import VideoPlayer from "@/components/Video/VideoPlayer/VideoPlayer";

export default function AnilibriaVideo({ id }: { id: string }) {
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', id],
        queryFn: async () => getAnilibriaData(),
    });

    async function getAnilibriaData() {
        const shikimoriAnime = (await shikimori.animes.byId({
            ids: id,
        })).animes[0];

        const shikimoriOriginalName = shikimoriAnime.name;
        const shikimoriEnglishName = shikimoriAnime.english;
        const shikimoriRussianName = shikimoriAnime.russian;
        const shikimoriYear = shikimoriAnime.airedOn?.year;
        const shikimoriDuration = shikimoriAnime.duration ?? 1;
        const approximateDuration = `(${shikimoriDuration - 1}, ${shikimoriDuration}, ${shikimoriDuration + 1})`;

        return await anilibria.advancedSearch(
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
    }

    if (isPending) {
        return <>Loading...</>;
    }

    return (
        <>
            <VideoPlayer title={data.names.ru} player={data.player} />
        </>
    );
}