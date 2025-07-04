"use client";

import { useMediaQuery } from "@mantine/hooks";
import { getNavbarItems } from "@/constants/navbar";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import MobileNavbar from "@/components/layout/MobileNavbar/MobileNavbar";
import { UserType } from "@/types/OAuth2/User.type";

export default function MobileNavbarWrapper({
    accountInfo,
}: {
    accountInfo: UserType;
}) {
    const matches = useMediaQuery('(min-width: 640px)');
    const dictionaries = useContextSelector(ConfigsContext, (value) => value.dictionaries);

    if (matches === true) {
        return;
    }

    const { avatar } = accountInfo;
    const navbarItems = getNavbarItems({
        dictionaries,
        avatar,
    });

    return (
        <MobileNavbar navbarItems={navbarItems} />
    );
}
