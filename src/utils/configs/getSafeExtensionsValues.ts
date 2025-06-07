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

        if (!Array.isArray(extension.pages)) {
            continue;
        }

        const stringPages = [];

        for (const page of extension.pages) {
            stringPages.push(page as string);
        }

        validExtensions.push({
            logo:    extension.logo as string,
            name:    extension.name as string,
            url:     extension.url as string,
            pages:   stringPages,
            author:  extension.author as string,
            version: extension.version as string,
        });
    }

    return validExtensions;
}
