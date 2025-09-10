import { ExtensionsLocalStorageKey } from "@/constants/app";
import { getExtensions } from "@/lib/extensions/getExtensions";

export function removeExtension(key: string) {
    const extensions = getExtensions({
        "local": true,
    });
    const extensionEntries = Object
        .entries(extensions)
        .filter(([filteringKey]) => filteringKey !== key);
    const filteredExtensions = Object.fromEntries(extensionEntries);

    localStorage?.setItem?.(ExtensionsLocalStorageKey, JSON.stringify(filteredExtensions));
}
