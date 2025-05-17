import { Suspense } from "react";
import AnilibriaVideo from "@/components/VideoFetch/AnilibriaVideo/AnilibriaVideo";

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
                    <>loading...</>
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