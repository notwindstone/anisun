"use client";

import NextTopLoader from "nextjs-toploader";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";

export default function TopLoader() {
    const { data } = useContext(ConfigsContext);
    const { colors: { accent } } = getSafeConfigValues({ config: data });

    return (
        <>
            <NextTopLoader
                color={accent}
                showSpinner={false}
            />
        </>
    );
}