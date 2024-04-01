'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

interface VideoEmbedProps {
    title: string;
    player: {
        host: string;
        list: {
            episode: string;
            hls: {
                fhd?: string;
                hd?: string;
                sd?: string;
            }
        }[]
    };
    preview: string;
}

export default function VideoEmbed({ title, player, preview }: VideoEmbedProps) {
    return (
        <>
            <VideoPlayer title={title} player={player} preview={preview} />
        </>
    );
}