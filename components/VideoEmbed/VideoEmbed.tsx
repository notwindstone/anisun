'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

interface VideoEmbedProps {
    host: string;
    source: {
        fhd?: string;
        hd?: string;
        sd?: string;
    };
    preview: string;
}

interface VideoPlaylistProps {
    fhd?: string;
    hd?: string;
    sd?: string;
}

export default function VideoEmbed({ host, source, preview }: VideoEmbedProps) {
    const playlist: VideoPlaylistProps = {};

    for (const [key, value] of Object.entries(source)) {
        if (value !== null) {
            // @ts-ignore
            playlist[key] = host + value;
        }
    }

    return (
        <>
            <VideoPlayer source={playlist} preview={preview} />
        </>
    );
}
