"use client";

import NextTopLoader from "nextjs-toploader";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import getTailwindColor from "@/utils/configs/getTailwindColor";

export default function TopLoader() {
    const { data } = useContext(ConfigsContext);
    const { colors: { accent } } = getSafeConfigValues({ config: data });
    const color = getTailwindColor({
        color: accent,
        step: 500,
    });
console.log(color)
    return (
        <>
            <NextTopLoader
                color={color}
                showSpinner={false}
            />
        </>
    );
}