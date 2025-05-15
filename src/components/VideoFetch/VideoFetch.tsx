import { Suspense } from "react";
import AnilibriaVideo from "@/components/VideoFetch/AnilibriaVideo/AnilibriaVideo";

export default function VideoFetch({
    idMal,
    selectedPlayer,
}: {
    idMal: number;
    selectedPlayer: string;
}) {
    let player: React.ReactNode;

    switch (selectedPlayer) {
        case "anilibria": {
            player = (
                <Suspense fallback={
                    <>loading...</>
                }>
                    <AnilibriaVideo idMal={idMal} />
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