import malToAnilibria from "@/lib/providersSync/malToAnilibria";
import VideoClientFetch from "@/components/VideoFetch/VideoClientFetch/VideoClientFetch";
import { AnilibriaSearchProvider } from "@/utils/providers/AnilibriaSearchProvider";
import AnilibriaSearch from "@/components/AnilibriaSearch/AnilibriaSearch";
import AnilibriaFetch from "@/components/AnilibriaFetch/AnilibriaFetch";
import VidstackPlayer from "@/components/VideoPlayer/VidstackPlayer/VidstackPlayer";

export default async function AnilibriaVideo({
    idMal,
    mediaSrc,
}: {
    idMal: number;
    mediaSrc?: string;
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
                <AnilibriaSearchProvider>
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