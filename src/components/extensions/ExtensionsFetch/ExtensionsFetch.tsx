"use client";

import ExtensionWrapper from "@/components/extensions/ExtensionWrapper/ExtensionWrapper";
import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";

export default function ExtensionsFetch({
    selectedExtension,
}: {
    selectedExtension: string;
}) {
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);

    if (extensions === undefined) {
        return (
            <div>
                Waiting for extensions...
            </div>
        );
    }

    if (extensions.length === 0) {
        return (
            <>
                download some extensions bro
            </>
        );
    }

    const filteredExtensions = extensions.filter(
        (filteringExtension) => (filteringExtension.isDisabled !== true) && (filteringExtension.areStyles !== true),
    );

    if (filteredExtensions.length === 0) {
        return (
            <>
                all extensions are disabled
            </>
        );
    }

    const selectedValidExtension = filteredExtensions.find(
        (currentExtension) => currentExtension.name === selectedExtension,
    ) ?? filteredExtensions[0];

    return (
        <>
            <ExtensionWrapper url={selectedValidExtension.url} />
        </>
    );
}
