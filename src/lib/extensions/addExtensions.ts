import type { ManifestType } from "@/types/Extensions/Extension.type";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { getExtensions } from "@/lib/extensions/getExtensions";

export function addExtensions(newExtensions: Record<string, ManifestType>) {
    const extensions = getExtensions({
        "local": true,
    });

    localStorage?.setItem?.(ExtensionsLocalStorageKey, JSON.stringify({
        ...extensions,
        ...newExtensions,
    }));
}
