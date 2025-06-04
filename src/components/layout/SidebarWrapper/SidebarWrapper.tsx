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
import { SidebarConfigContext } from "@/utils/providers/SidebarConfigProvider";

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
}: Readonly<{
    children: React.ReactNode;
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
    const { data: sidebarConfig, optimisticallyUpdate: optimisticallyUpdateSidebar } = useContextSelector(SidebarConfigContext, (value) => value,
    );
    const matches = useMediaQuery('(min-width: 640px)');

    if (matches === false) {
        return;
    }
console.log(sidebarConfig);
    return (
        <>
            <div
                className="hidden sm:flex flex-col gap-6 items-start justify-start p-2 shrink-0 h-full transition-sidebar duration-200 overflow-hidden"
                style={{
                    width:           sidebarConfig.expanded ? 256 : 56,
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
                        flexDirection: sidebarConfig.position === SidebarRightPosition
                            ? "row-reverse"
                            : "row",
                    }}
                >
                    {
                        sidebarConfig.expanded && (
                            <Link
                                className="flex gap-4 items-center select-none"
                                href="/"
                                style={{
                                    flexDirection: sidebarConfig.position === SidebarRightPosition
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
                            optimisticallyUpdateSidebar?.((state) => {
                                return {
                                    ...state,
                                    expanded: !state?.expanded,
                                };
                            });

                            setConfigValuesClient({
                                configs: {
                                    ...config,
                                    layout: {
                                        ...config.layout,
                                        sidebar: {
                                            ...config.layout.sidebar,
                                            expanded: !sidebarConfig.expanded,
                                        },
                                    },
                                },
                            });
                        }}
                        label={dictionaries?.aria?.toggleSidebar as string}
                    >
                        {icons?.[sidebarConfig.position]?.[sidebarConfig.expanded.toString()]}
                    </Button>
                </div>
                {children}
            </div>
        </>
    );
}
