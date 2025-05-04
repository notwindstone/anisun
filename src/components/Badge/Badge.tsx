"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

export default function Badge({
    children,
    isScore,
    score,
    textSize = "text-md",
}: {
    children: React.ReactNode;
    isScore?: boolean;
    score?: number;
    textSize?: `text-${"xs" | "sm" | "md" | "lg" | "xl" | "2xl"}`;
}) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    let scoreBadgeColorClassName = "";

    if (isScore && score !== undefined) {
        scoreBadgeColorClassName = score > 8.5
            ? "bg-green-700"
            : (score > 7
                ? "bg-yellow-700"
                : "bg-red-700");
    }

    const scoreIsNotZero = (!isScore) || (isScore && score !== 0);
    const hasText = children !== "";

    return (
        scoreIsNotZero && hasText ? (
            <p
                className={`rounded-sm ${textSize} px-2 py-1 leading-none ${scoreBadgeColorClassName}`}
                style={isScore ? undefined : {
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step: theme === DarkThemeKey
                            ? 900
                            : 100,
                    }),
                    color: parseTailwindColor({
                        color: base,
                        step: theme === DarkThemeKey
                            ? 300
                            : 800,
                    }),
                }}
            >
                {children}
            </p>
        ) : undefined
    );
}