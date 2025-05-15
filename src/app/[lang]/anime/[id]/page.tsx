import VideoFetch from "@/components/VideoFetch/VideoFetch";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // id is the anime's id from MyAnimeList
    const { id } = await params;
    const idMal = Number(id);

    return (
        <>
            <VideoFetch idMal={idMal} selectedPlayer={"anilibria"} />
        </>
    );
}