"use client";

import NextTopLoader from "nextjs-toploader";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { useContextSelector } from "use-context-selector";

export default function TopLoader() {
    const { colors: { accent } } = useContextSelector(ConfigsContext, (value) => value.data);
    const color = parseTailwindColor({
        color: accent,
        step:  600,
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
