import { ExtensionType } from "@/types/Extensions/Extension.type";

export default function getSafeExtensionsValues({
    parsedExtensions,
}: {
    parsedExtensions: Array<unknown>;
}): Array<ExtensionType> {
    const validExtensions: Array<ExtensionType> = [];

    for (const extension of parsedExtensions) {
        if (typeof extension !== "object" || extension === null) {
            continue;
        }

        if (
            !("logo" in extension) ||
            !("name" in extension) ||
            !("url" in extension) ||
            !("pages" in extension) ||
            !("version" in extension) ||
            !("author" in extension)
        ) {
            continue;
        }

        let extensionWithAllProperties: typeof extension & {
            isDisabled?:  boolean | undefined;
            areStyles?:   boolean | undefined;
            displayName?: string | undefined;
        } = extension;

        if (!("isDisabled" in extension)) {
            extensionWithAllProperties = {
                ...extension,
                isDisabled: true,
            };
        }

        if (!("areStyles" in extension)) {
            extensionWithAllProperties = {
                ...extensionWithAllProperties,
                areStyles: false,
            };
        }

        if (!("displayName" in extension)) {
            extensionWithAllProperties = {
                ...extensionWithAllProperties,
                displayName: extension.name as string,
            };
        }

        if (!Array.isArray(extensionWithAllProperties.pages)) {
            continue;
        }

        const stringPages = [];

        for (const page of extensionWithAllProperties.pages) {
            stringPages.push(page as string);
        }

        validExtensions.push({
            logo:        extensionWithAllProperties.logo as string,
            displayName: extensionWithAllProperties.displayName as string,
            name:        extensionWithAllProperties.name as string,
            url:         extensionWithAllProperties.url as string,
            pages:       stringPages,
            author:      extensionWithAllProperties.author as string,
            version:     extensionWithAllProperties.version as string,
            areStyles:   extensionWithAllProperties.areStyles,
            isDisabled:  extensionWithAllProperties.isDisabled,
        });
    }

    return validExtensions;
}
