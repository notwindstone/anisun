import React from "react";

export type SideBarLink = {
    label: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    pathname?: string;
    content?: React.ReactNode;
}