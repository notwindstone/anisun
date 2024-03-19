'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

interface VideoEmbedProps {
    source: string;
    preview: string;
}

export default function VideoEmbed({ source, preview }: VideoEmbedProps) {
    return (
        <>
            <VideoPlayer source={source} preview={preview} />
        </>
    );
}
