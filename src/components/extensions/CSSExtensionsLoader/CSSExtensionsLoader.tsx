"use client";

import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import ExtensionWrapper from "@/components/extensions/ExtensionWrapper/ExtensionWrapper";

export default function CSSExtensionsLoader() {
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);

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
                    <ExtensionWrapper key={extensionToUse.url} url={extensionToUse.url} />
                ))
            }
        </div>
    );
}
