"use client";

import NextTopLoader from "nextjs-toploader";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function TopLoader() {
    const { data } = useContext(ConfigsContext);
    const { colors: { accent } } = getSafeConfigValues({ config: data });
    const color = parseTailwindColor({
        color: accent,
        step: 500,
    });

    return (
        <>
            <NextTopLoader
                color={color}
                showSpinner={false}
            />
        </>
    );
}