import malToAnilibria from "@/lib/providersSync/malToAnilibria";
import VideoClientQuery from "@/components/player/VideoClientQuery/VideoClientQuery";
import { AnilibriaSearchProvider } from "@/utils/providers/AnilibriaSearchProvider";
import AnilibriaSearch from "@/components/search/AnilibriaSearch/AnilibriaSearch";
import AnilibriaQuery from "@/components/player/AnilibriaQuery/AnilibriaQuery";
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
                    <AnilibriaQuery />
                </AnilibriaSearchProvider>
            </>
        );
    }

    return (
        <>
            <VideoClientQuery
                queryKey={[anilibriaId.toString()]}
                method={"FetchAnilibriaVideo"}
                fetchArguments={anilibriaId}
            />
        </>
    );
}