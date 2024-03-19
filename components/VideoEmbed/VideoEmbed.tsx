'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

export default function VideoEmbed({ src }) {
    return (
        <>
            <VideoPlayer src={src} />
        </>
    );
}
