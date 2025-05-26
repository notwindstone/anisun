"use client";

import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { useContextSelector } from "use-context-selector";

export default function AnimatedGradientText({
    children,
}: {
    children: string;
}) {
    const { colors: { accent } } = useContextSelector(ConfigsContext, (value) => value.data);
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