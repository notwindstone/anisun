import VideoFetch from "@/components/VideoFetch/VideoFetch";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{
        selectedPlayer?: string;
        mediaSrc?: string;
    }>;
}) {
    // id is the anime's id from MyAnimeList
    const { id } = await params;
    const search = await searchParams;
    const idMal = Number(id);

    return (
        <>
            <VideoFetch
                idMal={idMal}
                selectedPlayer={"anilibria"}
                mediaSrc={search?.mediaSrc}
            />
        </>
    );
}