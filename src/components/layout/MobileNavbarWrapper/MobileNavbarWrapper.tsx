"use client";

import { useMediaQuery } from "@mantine/hooks";
import { getNavbarItems } from "@/constants/navbar";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import MobileNavbar from "@/components/layout/MobileNavbar/MobileNavbar";

export default function MobileNavbarWrapper({
    accountInfo,
}: {
    accountInfo: unknown;
}) {
    const matches = useMediaQuery('(min-width: 640px)');
    const dictionaries = useContextSelector(ConfigsContext, (value) => value.dictionaries);
    console.log("%c MobileNavbarWrapper re-rendered", "font-size: 48px; background-color: black");
    if (matches === true) {
        return;
    }

    let avatar: string | undefined;

    if (
        typeof accountInfo === "object"
        && accountInfo !== null
        && "avatar" in accountInfo
        && typeof accountInfo.avatar === "string"
    ) {
        avatar = accountInfo.avatar;
    }

    const navbarItems = getNavbarItems({
        dictionaries,
        avatar,
    });

    return (
        <MobileNavbar navbarItems={navbarItems} />
    );
}
