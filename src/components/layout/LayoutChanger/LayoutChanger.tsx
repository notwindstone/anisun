"use client";

import { useState } from "react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { SidebarRightPosition } from "@/constants/configs";
import { ArrowLeftRight } from "lucide-react";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { setConfigValuesClient } from "@/lib/configs/setConfigValues";
import Button from "@/components/base/Button/Button";
import { useContextSelector } from "use-context-selector";
import { SidebarConfigContext } from "@/lib/providers/SidebarConfigProvider";

function switchLayout({
    currentConfig,
}: {
    currentConfig: SafeConfigType;
}) {
    const newData: SafeConfigType = {
        ...currentConfig,
        layout: {
            ...currentConfig.layout,
            sidebar: {
                ...currentConfig.layout.sidebar,
                position: currentConfig.layout.sidebar.position === SidebarRightPosition
                    ? "left"
                    : "right",
            },
        },
    };

    setConfigValuesClient({
        configs: newData,
    });
}

export default function LayoutChanger() {
    const [pending, setPending] = useState(false);
    const { config, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            config:       value.data,
            dictionaries: value.dictionaries,
        };
    });
    const { data: sidebarConfig, optimisticallyUpdate: optimisticallyUpdateSidebar } = useContextSelector(SidebarConfigContext, (value) => value,
    );

    const handleSwitch = () => {
        setPending(true);

        optimisticallyUpdateSidebar?.((state) => {
            return {
                ...state,
                position: state?.position === SidebarRightPosition
                    ? "left"
                    : "right",
            };
        });

        switchLayout({
            currentConfig: {
                ...config,
                layout: {
                    ...config.layout,
                    sidebar: {
                        ...config.layout.sidebar,
                        ...sidebarConfig,
                    },
                },
            },
        });
        setPending(false);
    };

    return (
        <>
            <Button
                custom={{
                    appendClassNames: pending ? "ring-2 hidden sm:flex" : "hidden sm:flex",
                }}
                disabled={pending}
                onClick={handleSwitch}
                label={dictionaries?.aria?.switchLayout as string}
            >
                <ArrowLeftRight />
            </Button>
        </>
    );
}
