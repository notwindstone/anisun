"use client";

// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';

export default function VidstackPlayer({
    videoSrc,
}: {
    videoSrc: string;
}) {
    return (
        <>
            <MediaPlayer
                title="anime video"
                src={videoSrc}
            >
                <MediaProvider />
            </MediaPlayer>
        </>
    );
}