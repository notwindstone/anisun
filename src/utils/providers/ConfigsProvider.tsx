"use client";

import { createContext } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const ConfigsContext = createContext<object>({});

export default function ConfigsProvider({
    children,
    configs,
}: {
    children: React.ReactNode;
    configs: RequestCookie | undefined;
}) {
    const cookieData = configs?.value ?? "";

    return (
        <ConfigsContext.Provider value={{
            data: cookieData,
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}