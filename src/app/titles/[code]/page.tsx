import React from 'react';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";

interface ResponseDataProps {
    names: {
        ru: string;
    }
    player: {
        host: string;
        list: {
            episode: string;
            hls: {
                fhd?: string;
                hd?: string;
                sd?: string;
            }
        }[]
    },
}

export default async function Page({ params }: { params: { code: string } }) {
    const response = await fetch(`https://api.anilibria.tv/v3/title?code=${params.code}`);
    const responseData: ResponseDataProps = await response.json();
    const animePlayer = responseData.player;

    // Some anime titles don't have a player
    if (Object.keys(animePlayer.list).length === 0) {
        return (
            <>
                <div>{params.code}</div>
                <div>К сожалению, онлайн-плеер для данного аниме недоступен.</div>
            </>
        );
    }

    return (
        <>
            <div>{params.code}</div>
            <VideoEmbed
              title={responseData.names.ru}
              player={animePlayer}
              preview="https://anilibria.tv/storage/releases/episodes/previews/9542/1/DMzcnlKyg89dRv5f__86bf22cbc0faac3d42cc7b87ea8c712f.jpg"
            />
        </>
    );
}