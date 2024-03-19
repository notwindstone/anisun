import { Text } from '@mantine/core';
import React from 'react';
import VideoEmbed from "@/components/VideoEmbed/VideoEmbed";

export async function Welcome() {
    const host = 'https://cache.libria.fun'
    const res = await fetch('https://api.anilibria.tv/v3/genres');
    const obj = await res.json();
    const genres = obj.map((genre: []) => (
            <Text>{genre}</Text>
        ));

    const getRandomTitle = await fetch('https://api.anilibria.tv/v3/title/random');
    const randomTitle = await getRandomTitle.json();
    console.log(randomTitle.player.list[1].hls.fhd);

    const searchFrieren = await fetch('https://api.anilibria.tv/v3/title/search?search=фрирен&limit=1');
    const frierenTitle = await searchFrieren.json();
    const frierenEpisode = frierenTitle.list[0].player.list[1].hls.fhd;

    return (
        <>
            {genres}
            <VideoEmbed src={host + frierenEpisode} />
        </>
    );
}
