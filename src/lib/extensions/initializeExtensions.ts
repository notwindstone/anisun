import { ExtensionsLocalStorageKey } from "@/constants/app";

export function initializeExtensions() {
    const queriedExtensions = localStorage?.getItem?.(ExtensionsLocalStorageKey);

    if (queriedExtensions !== null) {
        return;
    }

    localStorage?.setItem?.(ExtensionsLocalStorageKey, JSON.stringify({}));
}
