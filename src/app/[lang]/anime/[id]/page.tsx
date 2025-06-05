import { cookies } from "next/headers";
import { ExtensionsCookieKey } from "@/constants/app";
import readCookiesData from "@/utils/configs/readCookiesData";
import ExtensionsFetch from "@/components/extensions/ExtensionsFetch/ExtensionsFetch";

export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<{
        selectedExtension?: string;
    }>;
}) {
    const search = await searchParams;
    const cookieStore = await cookies();
    const extensions = cookieStore.get(ExtensionsCookieKey);
    const parsedExtensions: unknown[] = readCookiesData({
        data:         extensions,
        fallbackData: [],
    });

    return (
        <>
            <div className="z-1000 sticky sm:static top-0">
                <ExtensionsFetch
                    extensions={parsedExtensions}
                    selectedExtension={search?.selectedExtension as string}
                />
            </div>
        </>
    );
}
