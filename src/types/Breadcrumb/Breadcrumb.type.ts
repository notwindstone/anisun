import React from "react";

export type BreadcrumbType = {
    currentPathname?: string,
    currentBreadcrumb?: string | null,
    icon?: React.ReactNode,
    websiteLocale?: string,
};