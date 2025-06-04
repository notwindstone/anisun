import { Suspense } from "react";
import AnilibriaVideo from "@/components/player/AnilibriaVideo/AnilibriaVideo";
import SkeletonPlayer from "@/components/player/SkeletonPlayer/SkeletonPlayer";
import { VideoPlayerType } from "@/types/Anime/VideoPlayer.type";
import KodikPlayer from "@/components/player/KodikPlayer/KodikPlayer";

export default function VideoFetch({
    idMal,
    selectedPlayer,
    mediaSrc,
    title,
}: {
    idMal: number;
    selectedPlayer: VideoPlayerType;
    title: string;
    mediaSrc?: string;
}) {
    let player: React.ReactNode;

    switch (selectedPlayer) {
        case "anilibria": {
            player = (
                <Suspense fallback={
                    <SkeletonPlayer status="mapping" />
                }>
                    <AnilibriaVideo
                        idMal={idMal}
                        mediaSrc={mediaSrc}
                        title={title}
                    />
                </Suspense>
            );

            break;
        }
        case "sovetromantica": {
            //player = (
            //    <ExtensionWrapper idMal={idMal} url={"/shitty.js"} />
            //gi);

            break;
        }
        default: {
            player = (
                <KodikPlayer idMal={idMal} />
            );

            break;
        }
    }

    return (
        <>
            {player}
        </>
    );
}
