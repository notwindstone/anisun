import ExtensionsFetch from "@/components/extensions/ExtensionsFetch/ExtensionsFetch";

export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<{
        selectedExtension?: string;
    }>;
}) {
    const search = await searchParams;

    return (
        <div className="flex flex-col sm:p-4 gap-4 mx-auto max-w-384">
            <div className="z-1000 sticky sm:static sm:rounded-md overflow-clip top-0">
                <ExtensionsFetch
                    selectedExtension={search?.selectedExtension as string}
                />
            </div>
        </div>
    );
}
