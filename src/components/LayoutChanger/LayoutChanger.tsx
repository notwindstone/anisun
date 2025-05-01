"use client";

import { useContext, useState } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { SidebarRightPosition } from "@/constants/configs";
import { ArrowLeftRight } from "lucide-react";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import Button from "@/components/Button/Button";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import { useThrottledCallback } from "@mantine/hooks";

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
    const { data: config, optimisticallyUpdate, dictionaries } = useContext(ConfigsContext);
    const router = useRouter();
    const loader = useTopLoader();

    const throttledSwitcher = useThrottledCallback(() => {
        setPending(true);
        loader.start();

        optimisticallyUpdate?.((state) => {
            return {
                ...state,
                layout: {
                    ...state?.layout,
                    sidebar: {
                        ...state?.layout?.sidebar,
                        position: state?.layout?.sidebar?.position === SidebarRightPosition
                            ? "left"
                            : "right",
                    },
                },
            };
        });

        switchLayout({
            currentConfig: config,
        });

        router.refresh();
        loader.done();
        setPending(false);
    }, 500);

    return (
        <>
            <Button
                custom={{
                    appendClassNames: pending ? "ring-2" : "",
                }}
                disabled={pending}
                onClick={() => throttledSwitcher()}
                label={dictionaries?.aria?.switchLayout as string}
            >
                <ArrowLeftRight />
            </Button>
        </>
    );
}