"use client";

import { ButtonHTMLAttributes, useContext } from "react";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import useConfiguredRipple from "@/hooks/useConfiguredRipple";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { DarkThemeKey } from "@/constants/configs";

type stylesType = "default" | "accent" | "base" | "transparent";

const getBackgroundColor = ({
    style,
    theme,
    colors: {
        accent,
        base,
    },
}: {
    style: stylesType;
    theme: "dark" | "light";
    colors: {
        accent: AccentColorsType;
        base: BaseColorsType;
    };
}) => {
    switch (style) {
        case "base": {
            return parseTailwindColor({
                color: base,
                step: theme === DarkThemeKey
                    ? 900
                    : 200,
            });
        }
        case "transparent": {
            return "transparent";
        }
        default: {
            return parseTailwindColor({
                color: accent,
                step: 500,
            });
        }
    }
};

export default function Button({
    children,
    label,
    custom,
    ...properties
}: {
    children: React.ReactNode;
    /** Sets aria-label */
    label: string;
    /** Custom properties */
    custom?: {
        /** Adds your own classes without overwriting current */
        appendClassNames?: string;
        /** Sets button style */
        style?: stylesType;
    };
} & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode {
    const { ripple, event } = useConfiguredRipple({
        disabled: properties?.disabled,
    });
    const { data: { theme, colors } } = useContext(ConfigsContext);
    const appendClassNames = custom?.appendClassNames ?? "";
    const style = custom?.style ?? "default";


    return (
        <>
            <button
                className={`text-white flex gap-2 rounded-md p-2 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-default ${appendClassNames}`}
                style={{
                    background: getBackgroundColor({
                        style,
                        theme,
                        colors,
                    }),
                }}
                aria-label={label}
                { ...properties }
                ref={ripple}
                onPointerDown={event}
            >
                {children}
            </button>
        </>
    );
}