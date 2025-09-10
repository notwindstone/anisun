import { ExtensionsLocalStorageKey } from "@/constants/app";
import { getExtensions } from "@/lib/extensions/getExtensions";

export function toggleExtension(key: string) {
    const extensions = getExtensions({
        "local": true,
    });

    // just to be safe
    if (!("enabled" in extensions[key])) {
        extensions[key].enabled = false;
    }

    const toDisable = !extensions[key].enabled;

    extensions[key].enabled = toDisable;

    localStorage?.setItem?.(ExtensionsLocalStorageKey, JSON.stringify(extensions));

    if (toDisable) {
    // notify the extension that it was disabled
        window.postMessage(`tsuki_disable_${key}`, "*");

        return;
    }

    // notify the extension that it was enabled
    window.postMessage(`tsuki_enable_${key}`, "*");
}
