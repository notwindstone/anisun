import type { ManifestType } from "@/types/Extensions/Extension.type";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { validateManifest } from "@/lib/extensions/validateManifest";

export function getExtensions(options?: { "local": boolean }): Record<string, ManifestType> {
    const foundExtensions: Record<string, ManifestType> = {};
    const queriedExtensions: string | null = localStorage?.getItem?.(ExtensionsLocalStorageKey);

    if (!queriedExtensions) {
        return foundExtensions;
    }

    let parsedExtensions: unknown;

    try {
        parsedExtensions = JSON.parse(queriedExtensions);
    } catch (error) {
        console.error(error);

        parsedExtensions = {};
    }

    if (
        typeof parsedExtensions !== "object" ||
    parsedExtensions === null
    ) {
        return foundExtensions;
    }

    const parsedExtensionEntries: Array<[string, unknown]> = Object.entries(parsedExtensions);

    for (const [extensionName, parsedManifest] of parsedExtensionEntries) {
        const validatedManifest = validateManifest(parsedManifest, options?.local);

        if (validatedManifest === false) {
            continue;
        }

        foundExtensions[extensionName] = validatedManifest;
    }

    return foundExtensions;
}
