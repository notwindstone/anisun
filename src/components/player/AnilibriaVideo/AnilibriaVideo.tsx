import malToAnilibria from "@/lib/providersSync/malToAnilibria";
import VideoClientFetch from "@/components/player/VideoClientFetch/VideoClientFetch";
import { AnilibriaSearchProvider } from "@/utils/providers/AnilibriaSearchProvider";
import AnilibriaSearch from "@/components/search/AnilibriaSearch/AnilibriaSearch";
import AnilibriaFetch from "@/components/fetch/AnilibriaFetch/AnilibriaFetch";
import VidstackPlayer from "@/components/player/VidstackPlayer/VidstackPlayer";

export default async function AnilibriaVideo({
    idMal,
    mediaSrc,
    title,
}: {
    idMal: number;
    mediaSrc?: string;
    title: string;
}) {
    const anilibriaId = await malToAnilibria({ idMal });

    if (mediaSrc) {
        return (
            <>
                <VidstackPlayer videoSrc={mediaSrc} />
            </>
        );
    }

    if (!anilibriaId) {
        return (
            <>
                <>no linked anime found</>
                <AnilibriaSearchProvider searchName={title}>
                    <AnilibriaSearch />
                    <AnilibriaFetch />
                </AnilibriaSearchProvider>
            </>
        );
    }

    return (
        <>
            <VideoClientFetch
                queryKey={[anilibriaId.toString()]}
                method={"FetchAnilibriaVideo"}
                fetchArguments={anilibriaId}
            />
        </>
    );
}