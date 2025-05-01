"use client";

import { useMediaQuery } from "@mantine/hooks";

export default function MobileNavbar() {
    const matches = useMediaQuery('(min-width: 640px)');

    if (matches === true) {
        return;
    }

    return (
        <>
            <div className="flex sm:hidden">
                asdfasdf
            </div>
        </>
    );
}