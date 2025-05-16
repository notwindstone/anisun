"use client";

import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaState } from '@vidstack/react';
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useEffect, useMemo, useRef } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export default function VidstackPlayer({
    videoSrc,
}: {
    videoSrc?: string;
}) {
    const searchParameters = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const reference = useRef<MediaPlayerInstance>(null);
    const currentTime = useMediaState('currentTime', reference);
    const error = useMediaState('error', reference);
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

    useEffect(() => {
        if (error === null) {
            return;
        }

        const parameters = new URLSearchParams(searchParameters);

        if (!parameters.has("mediaSrc")) {
            return;
        }

        parameters.delete("mediaSrc");
        replace(`${pathname}?${parameters.toString()}`);
    }, [error, pathname, searchParameters, replace]);

    console.log(currentTime, error);

    return (
        <>
            {memoizedPlayer}
        </>
    );
}