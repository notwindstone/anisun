"use client"

import {useContext} from "react";
import {CustomThemeContext} from "@/utils/Contexts";

export default function BaseButton() {
    const { theme } = useContext(CustomThemeContext);

    return (
        <>
            {theme.color}
            {theme.breadcrumb}
        </>
    )
}