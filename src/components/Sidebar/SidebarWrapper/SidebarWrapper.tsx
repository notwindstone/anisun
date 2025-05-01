"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import Button from "@/components/Button/Button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";

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
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: config, data: {
        theme,
        colors: { base },
        layout: { sidebar: { expanded, position } },
    }, dictionaries, optimisticallyUpdate } = useContext(ConfigsContext);

    return (
        <>
            <div
                className="shrink-0 h-full transition overflow-hidden"
                style={{
                    width: expanded ? 256 : 48,
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
                    {icons?.[position]?.[expanded.toString()]}
                </Button>
                {children}
            </div>
        </>
    );
}