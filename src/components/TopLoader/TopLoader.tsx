"use client";

import NextTopLoader from "nextjs-toploader";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function TopLoader() {
    const { data: { colors: { accent } } } = useContext(ConfigsContext);
    const color = parseTailwindColor({
        color: accent,
        step: 600,
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