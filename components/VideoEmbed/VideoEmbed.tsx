'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

interface VideoEmbedProps {
    host: string;
    source: {
        fhd: string;
        hd: string;
        sd: string;
    };
    preview: string;
}

export default function VideoEmbed({ host, source, preview }: VideoEmbedProps) {
    const playlist = {};

    for (const [key, value] of Object.entries(source)) {
        if (value !== null) {
            playlist[key] = host + value;
        }
    }

    console.log(playlist);

    return (
        <>
            <VideoPlayer source={playlist} preview={preview} />
        </>
    );
}
