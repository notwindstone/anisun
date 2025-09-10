"use client";

import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/lib/providers/ExtensionsProvider";
import { ManifestType } from "@/types/Extensions/Extension.type";
import ExtensionSubLoader from "@/components/extensions/ExtensionSubLoader/ExtensionSubLoader";

export default function ExtensionsLoader() {
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);

    return extensions.map((extension: ManifestType) => {
        if (extension.enabled === false) {
            return;
        }

        return (
            <ExtensionSubLoader
                key={extension.id}
                extension={extension}
            />
        );
    });
}