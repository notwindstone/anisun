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
import { UserType } from "@/types/OAuth2/User.type";
import { getSideBarLinks } from "@/constants/sidebar";
import { usePathname } from "next/navigation";
import useFuturePathname from "@/utils/stores/useFuturePathname";

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

export default function Sidebar({
    accountInfo,
}: Readonly<{
    accountInfo: UserType;
}>) {
    const setFuturePathname = useFuturePathname((state) => state.setFuturePathname);
    const { config, config: {
        theme,
        colors: { base, accent },
    }, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            config:       value.data,
            dictionaries: value.dictionaries,
        };
    });
    const { data: sidebarConfig, optimisticallyUpdate: optimisticallyUpdateSidebar } = useContextSelector(SidebarConfigContext, (value) => value,
    );
    const matches = useMediaQuery('(min-width: 640px)');
    // "/lang/route/another-route"
    const pathname = usePathname();
    // ["", "lang", "route", "another-route"]
    const pathnames = pathname.split("/");
    const pathnameRoot = `/${pathnames[2] ?? ""}`;

    if (matches === false) {
        return;
    }

    const { avatar, username } = accountInfo;
    const sidebarItems = getSideBarLinks({
        dictionaries,
        avatar,
        username,
    });

    const toggleSidebar = () => {
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
    };

    return (
        <>
            <div
                className="sidebar__wrapper hidden relative sm:flex flex-col gap-6 items-start justify-start p-2 shrink-0 h-full transition-sidebar duration-200 overflow-x-hidden overflow-y-auto"
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
                <button
                    aria-label="toggle sidebar"
                    onClick={toggleSidebar}
                    className={`sidebar__toggleable-border absolute top-0 bottom-0 w-2  cursor-w-resize transition z-100 border-transparent opacity-20 delay-200 duration-300 hover:border-neutral-500 ${sidebarConfig.position === "left" ? "right-0 border-r" : "left-0 border-l"}`}
                />
                <div
                    className="sidebar__title-wrapper flex w-full items-center justify-between"
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
                        onClick={toggleSidebar}
                        label={dictionaries?.aria?.toggleSidebar as string}
                    >
                        {icons?.[sidebarConfig.position]?.[sidebarConfig.expanded.toString()]}
                    </Button>
                </div>
                <div className="sidebar__sections-wrapper flex flex-col gap-2 w-full">
                    {
                        sidebarItems.map(({ title, links }) => {
                            return (
                                <div key={title} className="sidebar__links-wrapper flex flex-col gap-2 w-full">
                                    {
                                        links.map((link) => {
                                            if (link.hidden) {
                                                return;
                                            }

                                            return (
                                                <Link
                                                    // `null` by default, which means only static routes gonna fully prefetch
                                                    // `true` allows for the full dynamic route prefetch
                                                    prefetch
                                                    href={{
                                                        pathname: link.href,
                                                    }}
                                                    key={link.href}
                                                    className="sidebar__link dark:hover:bg-[#fff1] hover:bg-[#0001] transition-colors flex flex-nowrap items-center overflow-hidden w-full p-2 rounded-md"
                                                    aria-label={link.name}
                                                    title={link.name}
                                                    style={{
                                                        flexDirection: sidebarConfig.position === SidebarRightPosition
                                                            ? "row-reverse"
                                                            : "row",
                                                        // spread all object values
                                                        ...(
                                                            pathnameRoot === link.href ? {
                                                                backgroundColor: parseTailwindColor({
                                                                    color: base,
                                                                    step:  theme === DarkThemeKey ? 800 : 200,
                                                                }),
                                                                color: parseTailwindColor({
                                                                    color: accent,
                                                                    step:  theme === DarkThemeKey ? 400 : 500,
                                                                }),
                                                            } : {}
                                                        ),
                                                    }}
                                                    onClick={() => {
                                                        setFuturePathname({
                                                            path: link.href,
                                                            date: Date.now(),
                                                        });
                                                    }}
                                                >
                                                    <div className="flex justify-center items-center w-6 shrink-0">
                                                        {link.icon}
                                                    </div>
                                                    <p className="line-clamp-1">
                                                        <span className="px-1" />
                                                        {link.name}
                                                        <span className="px-1" />
                                                    </p>
                                                </Link>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}
