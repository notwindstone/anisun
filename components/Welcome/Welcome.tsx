import { Text } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import VideoEmbed from '@/components/VideoEmbed/VideoEmbed';

export async function Welcome() {
    const res = await fetch('https://api.anilibria.tv/v3/genres');
    const obj = await res.json();
    const genres = obj.map((genre: []) => (
            <Text>{genre}</Text>
        ));

    const searchFrieren = await fetch('https://api.anilibria.tv/v3/title/search?search=фрирен&limit=1', { cache: 'force-cache' });
    const frierenTitle = await searchFrieren.json();
    const frierenPlayer = frierenTitle.list[0].player;
    const frierenHost = `https://${frierenPlayer.host}`;
    const frierenImagesHost = 'https://anilibria.tv';
    const frierenEpisodeVideo = frierenPlayer.list[1].hls;
    const frierenEpisodePreview = frierenPlayer.list[1].preview;
    console.log(frierenImagesHost + frierenEpisodePreview);

    return (
        <>
            <Link href="/titles">213</Link>
            {genres}
            <VideoEmbed
              host={frierenHost}
              source={frierenEpisodeVideo}
              preview={frierenImagesHost + frierenEpisodePreview}
            />
        </>
    );
}
