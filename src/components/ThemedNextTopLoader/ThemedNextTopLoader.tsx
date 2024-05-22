"use client"

import NextTopLoader from "nextjs-toploader";
import React from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import {variables} from "@/configs/variables";

export default function ThemedNextTopLoader() {
    const { theme } = useCustomTheme()
    const color = theme.color
    // It can be MantineColor or HEX code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color)
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`
    const calculatedColor = isMantineColor ? mantineColor : color

    return (
        <NextTopLoader
            color={calculatedColor}
            showSpinner={false}
            height={4}
            zIndex={100000}
        />
    )
}