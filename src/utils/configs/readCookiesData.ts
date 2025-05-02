import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function readCookiesData<T>({
    data,
    fallbackData,
}: {
    data: RequestCookie | undefined;
    fallbackData: T;
}): T {
    let cookieData: T;
    const fallbackConfig = JSON.stringify(fallbackData);

    try {
        cookieData = JSON.parse(data?.value || fallbackConfig);
    } catch {
        cookieData = fallbackData;
    }

    return cookieData;
}