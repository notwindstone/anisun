"use client";

import { ButtonHTMLAttributes, useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ButtonStylesType } from "@/types/Appearance/ButtonStyles.type";
import getButtonColor from "@/utils/appearance/getButtonColor";

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
        /** Adds your own classes without overwriting current */
        appendClassNames?: string;
        /** Sets button style */
        style?: ButtonStylesType;
    };
} & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode {
    const { data: { theme, colors } } = useContext(ConfigsContext);
    const appendClassNames = custom?.appendClassNames ?? "";
    const style = custom?.style ?? "default";
    const { foreground, background } = getButtonColor({
        theme,
        colors,
        style,
    });

    return (
        <>
            <button
                className={`text-white flex gap-2 rounded-md p-2 cursor-pointer transition disabled:opacity-60 disabled:cursor-default hover:brightness-105 dark:hover:brightness-125 focus:ring-2 ring-black dark:ring-white ${appendClassNames}`}
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