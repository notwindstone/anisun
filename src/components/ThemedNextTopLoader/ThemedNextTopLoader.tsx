"use client"

import NextTopLoader from "nextjs-toploader";
import React from "react";
import {useLocalStorage} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from "@/configs/defaultTheme.json";

export default function ThemedNextTopLoader() {
    const [theme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            breadcrumb: true
        },
    })

    return (
        <NextTopLoader
            color={theme.color}
            showSpinner={false}
            height={4}
            zIndex={100000}
        />
    )
}