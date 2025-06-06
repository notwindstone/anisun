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

    const selectedValidExtension = extensions.find(
        (currentExtension) => currentExtension.name === selectedExtension,
    ) ?? extensions[0];

    return (
        <>
            <ExtensionWrapper url={selectedValidExtension.url} />
        </>
    );
}
