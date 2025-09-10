import type { ManifestType } from "@/types/Extensions/Extension.type";
import IsKeyInObject from "@/types/Utils/IsKeyInObject";
import { CategoriesSet } from "@/constants/extensions";

const requiredStringManifestKeys: Array<keyof ManifestType> = [
    "id",
    "logo",
    "name",
    "url",
    "version",
];
const requiredArrayManifestKeys: Array<keyof ManifestType> = [
    "authors",
    "languages",
    "categories",
];

export function validateManifest(
    parsedManifest: unknown,
    // if 'local', then the 'enabled' field will be in the final object too
    local?        : boolean,
): ManifestType | false {
    if (
        typeof parsedManifest !== "object" ||
      parsedManifest === null
    ) {
        return false;
    }

    // will be overwritten
    const safeManifest: ManifestType = {
        "id":         "",
        "logo":       "",
        "name":       "",
        "url":        "",
        "version":    "",
        "authors":    [],
        "languages":  [],
        "categories": [],
    };

    for (const key of requiredStringManifestKeys) {
        if (!IsKeyInObject<typeof parsedManifest>(key, parsedManifest)) {
            return false;
        }

        if (typeof parsedManifest[key] !== "string") {
            return false;
        }

        safeManifest[key] = parsedManifest[key];
    }

    for (const key of requiredArrayManifestKeys) {
        if (!IsKeyInObject<typeof parsedManifest>(key, parsedManifest)) {
            return false;
        }

        const parsedValue = parsedManifest[key];

        if (!Array.isArray(parsedValue)) {
            return false;
        }

        // 'categories' field requires specific string values
        if (key !== "categories") {
            // array entries can be anything tho
            safeManifest[key] = (parsedValue as Array<unknown>)
                .map((parsedArrayEntry) => {
                    return typeof parsedArrayEntry === "string"
                        ? parsedArrayEntry
                        : JSON.stringify(parsedArrayEntry);
                    // 'safeManifest[key]' somehow became 'never' typed
                }) as never;

            continue;
        }

        const safeCategories: Array<ManifestType["categories"][number]> = [];

        // typescript
        for (const parsedArrayEntry of parsedValue as Array<unknown>) {
            if (!CategoriesSet.has(
              // otherwise we will not be able to make this check
              parsedArrayEntry as ManifestType["categories"][number],
            )) {
                continue;
            }

            // we already did the check, so we are safe to do this
            safeCategories.push(parsedArrayEntry as ManifestType["categories"][number]);
        }

        // typescript is thinking 'safeManifest[key]' is 'never' again
        safeManifest[key] = safeCategories as never;
    }

    if (
        "description" in parsedManifest &&
      typeof parsedManifest.description === "string"
    ) {
        safeManifest.description = parsedManifest.description;
    }

    if (
        "pages" in parsedManifest &&
      Array.isArray(parsedManifest.pages)
    ) {
        safeManifest.pages = parsedManifest.pages;
    }

    if (
        local &&
      "enabled" in parsedManifest &&
      typeof parsedManifest.enabled === "boolean"
    ) {
        safeManifest.enabled = parsedManifest.enabled;
    }

    return safeManifest;
}
