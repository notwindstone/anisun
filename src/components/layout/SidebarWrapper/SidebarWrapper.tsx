"use client";

import { useMediaQuery } from "@mantine/hooks";
import { UserType } from "@/types/OAuth2/User.type";
import { getSideBarLinks } from "@/constants/sidebar";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function SidebarWrapper({
    accountInfo,
}: Readonly<{
    accountInfo: UserType;
}>) {
    const matches = useMediaQuery('(min-width: 640px)');
    const dictionaries = useContextSelector(ConfigsContext, (value) => value.dictionaries);

    if (matches === false) {
        return;
    }

    const { avatar, username } = accountInfo;
    const sidebarItems = getSideBarLinks({
        dictionaries,
        avatar,
        username,
    });

    return (
        <Sidebar
            sidebarItems={sidebarItems}
        />
    );
}
