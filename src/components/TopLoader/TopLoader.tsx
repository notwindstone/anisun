"use client";

import NextTopLoader from "nextjs-toploader";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function TopLoader() {
    const { data } = useContext(ConfigsContext);

    return (
        <>
            <NextTopLoader
                color={data?.colors.accent}
                showSpinner={false}
            />
        </>
    );
}