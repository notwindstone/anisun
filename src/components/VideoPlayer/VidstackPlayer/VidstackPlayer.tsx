"use client";

import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaState } from '@vidstack/react';
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useMemo, useRef } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

export default function VidstackPlayer({
    videoSrc,
}: {
    videoSrc: string;
}) {
    const reference = useRef<MediaPlayerInstance>(null);
    const currentTime = useMediaState('currentTime', reference);
    const memoizedPlayer = useMemo(
        () => (
            <MediaPlayer
                ref={reference}
                title="anime video"
                src={videoSrc}
            >
                <MediaProvider />
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
        ),
        [videoSrc],
    );

    console.log(currentTime);

    return (
        <>
            {memoizedPlayer}
        </>
    );
}