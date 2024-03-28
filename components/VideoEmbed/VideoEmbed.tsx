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

export default function VideoEmbed({ host, source, preview }: VideoEmbedProps) {
    return (
        <>
            <VideoPlayer host={host} source={source} preview={preview} />
        </>
    );
}
