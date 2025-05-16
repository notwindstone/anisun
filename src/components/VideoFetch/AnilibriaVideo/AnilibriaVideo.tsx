import malToAnilibria from "@/lib/providersSync/malToAnilibria";
import VideoClientFetch from "@/components/VideoFetch/VideoClientFetch/VideoClientFetch";
import { AnilibriaSearchProvider } from "@/utils/providers/AnilibriaSearchProvider";
import AnilibriaSearch from "@/components/AnilibriaSearch/AnilibriaSearch";

export default async function AnilibriaVideo({
    idMal,
}: {
    idMal: number;
}) {
    const anilibriaId = await malToAnilibria({ idMal });

    if (!anilibriaId) {
        return (
            <>
                <>no linked anime found</>
                <AnilibriaSearchProvider>
                    <AnilibriaSearch />
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