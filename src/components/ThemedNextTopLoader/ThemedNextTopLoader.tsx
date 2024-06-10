"use client";

import NextTopLoader from "nextjs-toploader";
import React from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import calculateColor from "@/utils/Misc/calculateColor";

export default function ThemedNextTopLoader() {
    const { theme } = useCustomTheme();
    const color = calculateColor(theme.topLoaderColor);

    return (
        <NextTopLoader
            color={color}
            showSpinner={false}
            height={4}
            zIndex={100000}
        />
    );
}