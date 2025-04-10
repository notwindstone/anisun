"use client";

import NextTopLoader from "nextjs-toploader";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { InitialConfig } from "@/constants/configs";

export default function TopLoader() {
    const { data } = useContext(ConfigsContext);
    const color = data?.colors?.accent ?? InitialConfig.colors.accent;

    return (
        <>
            <NextTopLoader
                color={color}
                showSpinner={false}
            />
        </>
    );
}