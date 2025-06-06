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
        <>
            <div className="z-1000 sticky sm:static top-0">
                <ExtensionsFetch
                    selectedExtension={search?.selectedExtension as string}
                />
            </div>
        </>
    );
}
