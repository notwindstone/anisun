import React from 'react';
import VideoEmbed from '@/components/VideoEmbed/VideoEmbed';

export default async function Page({ params }: { params: { code: string } }) {
    const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${params.code}&limit=1`);
    const responseData = await response.json();
    const animePlayer = responseData.list[0].player;
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
