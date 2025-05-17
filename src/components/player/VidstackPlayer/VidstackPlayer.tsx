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
import { List, SettingsIcon } from "lucide-react";

export default function VidstackPlayer({
    videoSrc,
}: {
    videoSrc?: string;
}) {
    const [controlsShown, setControlsShown] = useState(false);
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
                src={videoSrc}
                title={searchParameters.get("title") ?? undefined}
                className="!rounded-none"
                onControlsChange={setControlsShown}
                viewType="video"
                aspectRatio={"16 / 9"}
            >
                <MediaProvider />
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout
                    icons={defaultLayoutIcons}
                >
                    <Menu.Root>
                        <Menu.Button
                            className={`absolute w-9 h-9 rounded-lg flex justify-center items-center z-10 top-1 left-1 bg-transparent transition duration-200 ease-out hover:scale-105 hover:bg-[#fff3] hover:cursor-pointer focus:scale-105 focus:bg-[#fff3] ${controlsShown ? "" : "hidden"}`}
                        >
                            <List size={24} />
                        </Menu.Button>
                        <Menu.Items
                            className="vds-menu-items flex transition max-h-[400px] ml-1 min-w-56 flex-col overflow-y-auto overscroll-y-contain rounded-lg border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none"
                            placement="top"
                            offset={0}
                        >
                            {/* Menu Items + Submenus */}
                        </Menu.Items>
                    </Menu.Root>
                </DefaultVideoLayout>
            </MediaPlayer>
        ),
        [controlsShown, videoSrc, searchParameters],
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