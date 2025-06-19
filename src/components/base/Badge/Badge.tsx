"use client";

import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";

type textSizeType = `${"" | "sm:"}text-${"xs" | "sm" | "md" | "lg" | "xl" | "2xl"}`;

export default function Badge({
    children,
    isScore,
    score,
    textSize = "text-md",
    appendClassNames,
    onClick,
    label,
    labelPosition = "right",
}: {
    children: React.ReactNode;
    isScore?: boolean;
    score?: number;
    textSize?: textSizeType | `${textSizeType} ${textSizeType}`;
    appendClassNames?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    label?: string;
    labelPosition?: "left" | "right" | "top" | "bottom";
}) {
    const { theme, colors: { base } } = useContextSelector(ConfigsContext, (value) => value.data);
    let scoreBadgeColorClassName;

    if (!isScore || score === undefined) {
        scoreBadgeColorClassName = "";
    } else if (score >= 8.7) {
        scoreBadgeColorClassName = "bg-indigo-700";
    } else if (score >= 7.5) {
        scoreBadgeColorClassName = "bg-green-700";
    } else if (score >= 6) {
        scoreBadgeColorClassName = "bg-yellow-700";
    } else {
        scoreBadgeColorClassName = "bg-red-700";
    }

    const scoreIsNotZero = (!isScore) || (isScore && score !== 0);
    const hasText = children !== "";

    return (
        scoreIsNotZero && hasText ? (
            <p
                { ...(label === undefined ? {} : {
                    "data-tooltip-left":   labelPosition === "left",
                    "data-tooltip-right":  labelPosition === "right",
                    "data-tooltip-bottom": labelPosition === "bottom",
                    "data-tooltip-top":    labelPosition === "top",
                }) }
                data-tooltip={label}
                aria-label={label}
                className={`transition-colors duration-200 rounded-md ${textSize} px-2 py-1 leading-none ${scoreBadgeColorClassName} ${appendClassNames ? `${appendClassNames}` : ""}`}
                style={isScore ? undefined : {
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 900
                            : 100,
                    }),
                    color: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 300
                            : 800,
                    }),
                }}
                onClick={onClick}
            >
                {children}
            </p>
        ) : undefined
    );
}
