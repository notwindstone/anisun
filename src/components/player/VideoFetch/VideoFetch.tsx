import { Suspense } from "react";
import AnilibriaVideo from "@/components/player/AnilibriaVideo/AnilibriaVideo";
import SkeletonPlayer from "@/components/player/SkeletonPlayer/SkeletonPlayer";

export default function VideoFetch({
    idMal,
    selectedPlayer,
    mediaSrc,
    title,
}: {
    idMal: number;
    selectedPlayer: string;
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
    }

    return (
        <>
            {player}
        </>
    );
}
