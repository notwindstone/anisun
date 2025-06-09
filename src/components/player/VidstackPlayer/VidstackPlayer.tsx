"use client";

import {
    MediaPlayer,
    MediaPlayerInstance,
    MediaProvider,
    useMediaState,
    Menu,
} from '@vidstack/react';
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useEffect, useMemo, useRef, useState } from "react";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import '@/components/player/VidstackPlayer/VidstackPlayer.global.css';
import { List, Pause, Play } from "lucide-react";

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
    const duration = useMediaState('duration', reference);
    const error = useMediaState('error', reference);
    const controlsVisible = useMediaState('controlsVisible', reference);
    const isPlayingMediaState = useMediaState('playing', reference);
    const playerWidth = useMediaState('width', reference);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isTheLastTenSeconds = (duration - currentTime) <= 10;

    const [isSeeked, setIsSeeked] = useState<"forward" | "backward" | undefined>();
    const [beforeSeekTime, setBeforeSeekTime] = useState(currentTime);

    const isPlayerCompact = playerWidth <= 676;
    // __local-control class changes the parent's node height to zero
    // so that user could seek the video using double taps/clicks
    // but:
    // 1. setting the parent's node height to zero breaks controls positions in the normal layout
    // 2. also in the normal layout we don't need the parent's node height value as zero for seeking
    const localControlsClassName = isPlayerCompact
        ? "__local-control"
        : "";
    const handleSeek = () => {
        if (!reference.current) {
            return;
        }

        setBeforeSeekTime(reference.current.currentTime);
    };
    const memoizedPlayer = useMemo(
        () => (
            <MediaPlayer
                onClick={handleSeek}
                onTouchStart={handleSeek}
                onSeeked={(time: number) => {
                    const difference = beforeSeekTime - time;

                    if (difference < 0) {
                        setIsSeeked("forward");

                        const timeout = setTimeout(() => {
                            setIsSeeked(undefined);
                        }, 400);

                        return () => clearTimeout(timeout);
                    }

                    if (difference > 0) {
                        setIsSeeked("backward");

                        const timeout = setTimeout(() => {
                            setIsSeeked(undefined);
                        }, 400);

                        return () => clearTimeout(timeout);
                    }
                }}
                playsInline={true}
                ref={reference}
                src={videoSrc}
                title={searchParameters.get("title") ?? undefined}
                className="!rounded-none !overflow-clip !border-none"
                viewType="video"
                aspectRatio="16 / 9"
            >
                <MediaProvider />
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                    slots={{
                        playButton: (
                            <button
                                className={`${localControlsClassName} flex justify-center items-center bg-transparent transition duration-200 ease-out hover:scale-110 hover:bg-[#fff3] hover:cursor-pointer active:scale-110 active:bg-[#fff3] mr-2`}
                                style={{
                                    borderRadius: isPlayerCompact ? "100%" : 8,
                                    width:        isPlayerCompact ? 96 : 40,
                                    height:       isPlayerCompact ? 96 : 40,
                                }}
                                onClick={async () => {
                                    if (!reference.current) {
                                        return;
                                    }

                                    if (reference.current.paused) {
                                        await reference.current.play();

                                        return;
                                    }

                                    await reference.current.pause();
                                }}
                                title={"Play video"}
                                aria-label={"Play video"}
                            >
                                {
                                    isPlayingMediaState ? (
                                        <Pause size={isPlayerCompact ? 40 : 24} />
                                    ) : (
                                        <Play size={isPlayerCompact ? 40 : 24} />
                                    )
                                }
                            </button>
                        ),
                    }}
                >
                    <div
                        className="pointer-events-none absolute flex aspect-square h-[200%] top-0 left-0 translate-x-[-85%] translate-y-[-25%] rounded-full transition duration-100"
                        style={{
                            background: isSeeked === "backward"
                                ? "#0005"
                                : "#0000",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute flex aspect-square h-[200%] top-0 right-0 translate-x-[85%] translate-y-[-25%] rounded-full transition duration-100"
                        style={{
                            background: isSeeked === "forward"
                                ? "#0005"
                                : "#0000",
                        }}
                    />
                    <Menu.Root>
                        <Menu.Button
                            className={"absolute w-9 h-9 rounded-lg justify-center items-center z-10 bg-transparent transition duration-200 ease-out hover:scale-110 hover:bg-[#fff3] hover:cursor-pointer focus:scale-110 focus:bg-[#fff3]"}
                            style={
                                isPlayerCompact ? {
                                    display: controlsVisible ? "flex" : "none",
                                    top:     4,
                                    left:    4,
                                } : {
                                    display: controlsVisible ? "flex" : "none",
                                    bottom:  10,
                                    right:   96,
                                }
                            }
                        >
                            <List size={24} />
                        </Menu.Button>
                        <Menu.Items
                            className="vds-menu-items flex transition max-h-[400px] min-w-56 flex-col overflow-y-auto overscroll-y-contain rounded-lg border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none"
                            placement={
                                isPlayerCompact ? "bottom start" : "top end"
                            }
                            style={{
                                margin: isPlayerCompact
                                    ? "0 4px 0 0"
                                    : "0 0 0 4px",
                            }}
                            offset={0}
                        >
                            {/* Menu Items + Submenus */}
                        </Menu.Items>
                    </Menu.Root>
                </DefaultVideoLayout>
            </MediaPlayer>
        ),
        [
            localControlsClassName,
            beforeSeekTime,
            isSeeked,
            isPlayingMediaState,
            isPlayerCompact,
            isTheLastTenSeconds,
            controlsVisible,
            videoSrc,
            searchParameters,
        ],
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

    //console.log(currentTime, error);

    return (
        <>
            {memoizedPlayer}
        </>
    );
}
