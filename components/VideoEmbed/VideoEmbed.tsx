'use client';

import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {Button} from "@mantine/core";

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
            <Button
                onClick={(event) => event.preventDefault()}
            >Поменять качество</Button>
            <VideoPlayer source={video} preview={preview} />
        </>
    );
}
