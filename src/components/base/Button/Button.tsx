"use client";

import { ButtonHTMLAttributes } from "react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { ButtonStylesType } from "@/types/Appearance/ButtonStyles.type";
import getButtonColor from "@/lib/appearance/getButtonColor";
import { useContextSelector } from "use-context-selector";

export default function Button({
    children,
    label,
    custom,
    ...properties
}: {
    children?: React.ReactNode;
    /** Sets both aria-label & title properties */
    label: string;
    /** Custom properties */
    custom?: {
        /** Makes background darker/lighter depending on the theme */
        darker?: boolean;
        /** Adds your own classes without overwriting current */
        appendClassNames?: string;
        /** Sets button style */
        style?: ButtonStylesType;
    };
} & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode {
    const { theme, colors } = useContextSelector(ConfigsContext, (value) => value.data);
    const appendClassNames = custom?.appendClassNames ?? "";
    const style = custom?.style ?? "default";
    const darker = custom?.darker ?? false;
    const { foreground, background } = getButtonColor({
        darker,
        theme,
        colors,
        style,
    });

    return (
        <>
            <button
                className={`text-white flex items-center gap-2 rounded-md p-2 cursor-pointer transition duration-200 disabled:opacity-60 disabled:hover:brightness-100 disabled:cursor-not-allowed hover:brightness-105 dark:hover:brightness-125 focus:ring-2 ring-black dark:ring-white ${appendClassNames}`}
                style={{
                    color: foreground,
                    background,
                }}
                aria-label={label}
                title={label}
                { ...properties }
                onPointerUp={(event: React.PointerEvent<HTMLButtonElement>) => {
                    const currentTarget = event?.currentTarget;

                    properties?.onPointerUp?.(event);

                    const timeout = setTimeout(() => {
                        currentTarget?.blur?.();
                    }, 150);

                    return () => {
                        clearTimeout(timeout);
                    };
                }}
            >
                {children}
            </button>
        </>
    );
}
