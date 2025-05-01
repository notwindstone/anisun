"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, SidebarRightPosition } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import Button from "@/components/Button/Button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import AnimatedGradientText from "@/components/AnimatedGradientText/AnimatedGradientText";
import { AppName, FaviconBlurredBase64 } from "@/constants/app";
import favicon from "../../../../public/favicon-x40.jpg";
import Image from "next/image";
import Link from "next/link";

const icons: {
    [key: string]: {
        [key: string]: React.ReactNode;
    }
} = {
    "left": {
        "true": <PanelLeftClose />,
        "false": <PanelLeftOpen />,
    },
    "right": {
        "true": <PanelLeftOpen />,
        "false": <PanelLeftClose />,
    },
};

export default function SidebarWrapper({
    children,
    serverSideSidebarPosition,
}: Readonly<{
    children: React.ReactNode;
    serverSideSidebarPosition: "left" | "right";
}>) {
    const { data: config, data: {
        theme,
        colors: { base },
        layout: { sidebar: { expanded } },
    }, dictionaries, optimisticallyUpdate } = useContext(ConfigsContext);

    return (
        <>
            <div
                className="flex flex-col gap-2 items-start justify-start p-2 shrink-0 h-full transition-colors overflow-hidden"
                style={{
                    width: expanded ? 256 : 56,
                    backgroundColor: theme === DarkThemeKey
                        ? parseTailwindColor({
                            color: base,
                            step: 900,
                        })
                        : parseTailwindColor({
                            color: base,
                            step: 100,
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
                                <Image
                                    className="w-10 h-10 rounded-md ring-2 ring-black dark:ring-white drop-shadow-md transition"
                                    src={favicon}
                                    alt={"Tenshi Hinanawi, a character from Touhou"}
                                    blurDataURL={FaviconBlurredBase64}
                                    placeholder={"blur"}
                                />
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
                            optimisticallyUpdate?.((state) => {
                                return {
                                    ...state,
                                    layout: {
                                        ...state?.layout,
                                        sidebar: {
                                            ...state?.layout?.sidebar,
                                            expanded: !state?.layout?.sidebar?.expanded,
                                        },
                                    },
                                };
                            });

                            setConfigValuesClient({
                                configs: {
                                    ...config,
                                    layout: {
                                        ...config.layout,
                                        sidebar: {
                                            ...config.layout.sidebar,
                                            expanded: !config.layout.sidebar.expanded,
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