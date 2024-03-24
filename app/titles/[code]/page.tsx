import React from 'react';
import VideoEmbed from '@/components/VideoEmbed/VideoEmbed';

interface ResponseDataProps {
    player: {
        host: string;
        list: {
            hls: {
                fhd: string;
                hd: string;
                sd: string;
            }
        }[]
    },
}

export default async function Page({ params }: { params: { code: string } }) {
    const response = await fetch(`https://api.anilibria.tv/v3/title?code=${params.code}`);
    const responseData: ResponseDataProps = await response.json();
    const animePlayer = responseData.player;
    const animeHost = `https://${animePlayer.host}`;
    const animeEpisodeVideo = animePlayer.list[1].hls.fhd;

    return (
        <>
            <div>{params.code}</div>
            <VideoEmbed
              source={animeHost + animeEpisodeVideo}
              preview=""
            />
        </>
    );
}
