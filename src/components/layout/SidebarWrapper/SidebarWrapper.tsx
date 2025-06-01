"use client";

import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, SidebarRightPosition } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import Button from "@/components/base/Button/Button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import AnimatedGradientText from "@/components/base/AnimatedGradientText/AnimatedGradientText";
import { AppName } from "@/constants/app";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import Favicon from "@/components/base/Favicon/Favicon";
import { useContextSelector } from "use-context-selector";
import { useState } from "react";

const icons: {
    [key: string]: {
        [key: string]: React.ReactNode;
    }
} = {
    "left": {
        "true":  <PanelLeftClose />,
        "false": <PanelLeftOpen />,
    },
    "right": {
        "true":  <PanelLeftOpen />,
        "false": <PanelLeftClose />,
    },
};

export default function SidebarWrapper({
    children,
    serverSideSidebarPosition,
    serverSideSidebarExpanded,
}: Readonly<{
    children: React.ReactNode;
    serverSideSidebarPosition: "left" | "right";
    serverSideSidebarExpanded: boolean;
}>) {
    const { config, config: {
        theme,
        colors: { base },
    }, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            config:       value.data,
            dictionaries: value.dictionaries,
        };
    });
    const [expanded, setExpanded] = useState<boolean>(serverSideSidebarExpanded);
    const matches = useMediaQuery('(min-width: 640px)');

    if (matches === false) {
        return;
    }

    return (
        <>
            <div
                // WebStorm says that `transition-[width]` is already applied by `transition`
                // That's a lie.
                className="hidden sm:flex flex-col gap-6 items-start justify-start p-2 shrink-0 h-full transition-sidebar duration-200 overflow-hidden"
                style={{
                    width:           expanded ? 256 : 56,
                    backgroundColor: theme === DarkThemeKey
                        ? parseTailwindColor({
                            color: base,
                            step:  900,
                        })
                        : parseTailwindColor({
                            color: base,
                            step:  100,
                        }),
                }}
            >
                <div
                    className="flex w-full items-center justify-between"
                    style={{
                        flexDirection: serverSideSidebarPosition === SidebarRightPosition
                            ? "row-reverse"
                            : "row",
                    }}
                >
                    {
                        expanded && (
                            <Link
                                className="flex gap-4 items-center select-none"
                                href="/"
                                style={{
                                    flexDirection: serverSideSidebarPosition === SidebarRightPosition
                                        ? "row-reverse"
                                        : "row",
                                }}
                            >
                                <Favicon />
                                <AnimatedGradientText>
                                    {AppName.toUpperCase()}
                                </AnimatedGradientText>
                            </Link>
                        )
                    }
                    <Button
                        custom={{
                            style: "base",
                        }}
                        onClick={() => {
                            setExpanded((state) => !state);
                            setConfigValuesClient({
                                configs: {
                                    ...config,
                                    layout: {
                                        ...config.layout,
                                        sidebar: {
                                            ...config.layout.sidebar,
                                            expanded: !expanded,
                                        },
                                    },
                                },
                            });
                        }}
                        label={dictionaries?.aria?.toggleSidebar as string}
                    >
                        {icons?.[serverSideSidebarPosition]?.[expanded.toString()]}
                    </Button>
                </div>
                {children}
            </div>
        </>
    );
}
