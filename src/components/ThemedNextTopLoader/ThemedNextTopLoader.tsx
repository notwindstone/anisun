"use client"

import NextTopLoader from "nextjs-toploader";
import React from "react";
import {useLocalStorage} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from "@/configs/defaultTheme.json";
import useCustomTheme from "@/hooks/useCustomTheme";

export default function ThemedNextTopLoader() {
    const { theme } = useCustomTheme()

    return (
        <NextTopLoader
            color={theme.color}
            showSpinner={false}
            height={4}
            zIndex={100000}
        />
    )
}