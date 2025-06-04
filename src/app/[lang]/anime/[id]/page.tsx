import VideoFetch from "@/components/player/VideoFetch/VideoFetch";
import { VideoPlayerType } from "@/types/Anime/VideoPlayer.type";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{
        selectedPlayer?: string;
        mediaSrc?: string;
        title?: string;
    }>;
}) {
    // id is the anime's id from MyAnimeList
    const { id } = await params;
    const search = await searchParams;
    const idMal = Number(id);

    let selectedPlayer: VideoPlayerType;

    switch (search?.selectedPlayer) {
        case "anilibria": {
            selectedPlayer = "anilibria";

            break;
        }
        case "sovetromantica": {
            selectedPlayer = "sovetromantica";

            break;
        }
        default: {
            selectedPlayer = "kodik";

            break;
        }
    }

    return (
        <>
            <div className="z-1000 sticky sm:static top-0">
                <VideoFetch
                    idMal={idMal}
                    selectedPlayer={selectedPlayer}
                    mediaSrc={search?.mediaSrc}
                    title={search?.title ?? ""}
                />
            </div>
        </>
    );
}
