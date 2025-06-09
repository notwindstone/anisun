"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function StylesheetsGC(): React.ReactNode {
    const pathname = usePathname();

    // every time pathname changes, extensions reload and previous stylesheets remain in the document
    // while reloaded extension's stylesheet is being applied again
    // so after a couple of route changes user ends up with a lot of the same stylesheets.
    // seems like that's not the case for JS scripts tho
    useEffect(() => {
        const stylesheets = document.head.querySelectorAll("style");
        const GCSet = new Set<string>([]);

        for (const sheet of stylesheets) {
            if (sheet.textContent?.startsWith(".garbageCollectorClearMe")) {
                if (GCSet.has(sheet.textContent)) {
                    sheet.remove();

                    continue;
                }

                GCSet.add(sheet.textContent);
            }
        }
    }, [pathname]);

    return;
}
