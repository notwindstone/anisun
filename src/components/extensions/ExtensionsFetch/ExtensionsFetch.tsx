import ExtensionWrapper from "@/components/extensions/ExtensionWrapper/ExtensionWrapper";

export default function ExtensionsFetch({
    extensions,
    selectedExtension,
}: {
    extensions: unknown[];
    selectedExtension: string;
}) {
    const validExtensions: Array<{
        name: string;
        url: string;
    }> = [];
    let selectedValidExtension: {
        name: string;
        url: string;
    } | undefined;

    for (const extension of extensions) {
        if (typeof extension !== "object" || extension === null) {
            continue;
        }

        if (
            !("name" in extension) ||
            !("url" in extension)
        ) {
            continue;
        }

        if (selectedExtension === extension.name) {
            selectedValidExtension = {
                name: extension.name as string,
                url:  extension.url as string,
            };
        }

        validExtensions.push({
            name: extension.name as string,
            url:  extension.url as string,
        });
    }

    if (validExtensions.length === 0) {
        return (
            <>
                download some extensions bro
            </>
        );
    }

    if (selectedValidExtension === undefined) {
        selectedValidExtension = validExtensions[0];
    }

    return (
        <>
            <ExtensionWrapper url={selectedValidExtension.url} />
        </>
    );
}
