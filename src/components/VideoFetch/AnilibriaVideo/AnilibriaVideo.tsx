import malToAnilibria from "@/lib/providersSync/malToAnilibria";
import VideoClientFetch from "@/components/VideoFetch/VideoClientFetch/VideoClientFetch";

export default async function AnilibriaVideo({
    idMal,
}: {
    idMal: number;
}) {
    const anilibriaId = await malToAnilibria({ idMal });

    if (!anilibriaId) {
        return;
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