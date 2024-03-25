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
    const video = host + source.fhd;

    return (
        <>
            <VideoPlayer source={video} preview={preview} />
        </>
    );
}
