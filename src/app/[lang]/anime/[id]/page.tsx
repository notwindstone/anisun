import VideoFetch from "@/components/player/VideoFetch/VideoFetch";
import { VideoPlayerType } from "@/types/Anime/VideoPlayer.type";

export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<{
        selectedPlayer?: string;
        mediaSrc?: string;
        title?: string;
    }>;
}) {
    const search = await searchParams;

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
                    selectedPlayer={selectedPlayer}
                    mediaSrc={search?.mediaSrc}
                    title={search?.title ?? ""}
                />
            </div>
        </>
    );
}
