"use client";

import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function AnimatedGradientText({
    children,
}: {
    children: string;
}) {
    const { data: { colors: { accent } } } = useContext(ConfigsContext);
    const gradientFrom = parseTailwindColor({
        color: accent,
        step:  700,
    });
    const gradientTo = parseTailwindColor({
        color: accent,
        step:  400,
    });

    return (
        <div
            className={`animate-gradient text-2xl font-bold text-transparent leading-none`}
            style={{
                backgroundImage: `linear-gradient(to right,${gradientFrom},${gradientTo},${gradientFrom})`,
                backgroundClip:  "text",
                backgroundSize:  "200% auto",
            }}
        >
            {children}
        </div>
    );
}