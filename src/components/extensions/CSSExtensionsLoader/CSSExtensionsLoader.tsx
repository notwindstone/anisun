"use client";

import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import { useEffect, useState } from "react";
import ExtensionWrapper from "@/components/extensions/ExtensionWrapper/ExtensionWrapper";
import { usePathname } from "next/navigation";

export default function CSSExtensionsLoader() {
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);
    const pathname = usePathname();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // fixing a hydration error by timing out the initial render?
        // yeah i'm cooked
        // somehow a 200ms timeout gives an error while 300ms timeout works (seems like)
        const timeout = setTimeout(() => setHydrated(true), 300);

        return () => clearTimeout(timeout);
    }, []);

    if (!hydrated) {
        return;
    }

    if (extensions === undefined) {
        return;
    }

    const filteredExtensions = extensions.filter(
        (filteringExtension) => (filteringExtension.isDisabled !== true) && (filteringExtension.areStyles !== false),
    );

    if (filteredExtensions.length === 0) {
        return;
    }

    return (
        <div id="extensions-css-loader-id" className="relative w-0 h-0 overflow-clip">
            {
                filteredExtensions.map((extensionToUse) => (
                    <ExtensionWrapper
                        // extension mounts don't work when changing routes, so we re-render extensions every pathname change :noooo:
                        key={`${pathname}_${extensionToUse.url}`}
                        url={extensionToUse.url}
                    />
                ))
            }
        </div>
    );
}
