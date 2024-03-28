import React from 'react';
import VideoEmbed from '@/components/VideoEmbed/VideoEmbed';
import { Comments } from '@/components/Comments/Comments';

interface ResponseDataProps {
    player: {
        host: string;
        list: {
            episode: string;
            uuid: string;
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
              player={animePlayer}
              preview=""
            />
            <Comments />
        </>
    );
}
