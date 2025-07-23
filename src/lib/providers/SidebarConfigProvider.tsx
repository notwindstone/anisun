"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "use-context-selector";
import { InitialConfig } from "@/constants/configs";
import { SidebarConfigType } from "@/types/Configs/SidebarConfig.type";
import { DeepRequired } from "@/types/Utils/DeepRequired";
import { Generalise } from "@/types/Utils/Generalise";

export const SidebarConfigContext = createContext<{
    data: DeepRequired<NonNullable<SidebarConfigType>>;
    optimisticallyUpdate: Dispatch<
        SetStateAction<
            Generalise<
                SidebarConfigType
            >
        >
    > | undefined;
}>({
    data:                 InitialConfig.layout.sidebar,
    optimisticallyUpdate: undefined,
});

export function SidebarConfigProvider({
    children,
    configs,
}: {
    children: React.ReactNode;
    configs: Generalise<SidebarConfigType>;
}) {
    const [sidebarState, setSidebarState] = useState<Generalise<SidebarConfigType>>(configs);

    const safePosition: "right" | "left" = sidebarState?.position === "left"
        ? "left"
        : "right";
    const safeSidebarState: DeepRequired<NonNullable<SidebarConfigType>> = {
        expanded: Boolean(sidebarState?.expanded),
        position: safePosition,
    };

    return (
        <SidebarConfigContext.Provider value={{
            data:                 safeSidebarState,
            optimisticallyUpdate: setSidebarState,
        }}>
            {children}
        </SidebarConfigContext.Provider>
    );
}
