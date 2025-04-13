import { InitialConfig } from "@/constants/configs";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function readCookiesData({
    configs,
}: {
    configs: RequestCookie | undefined;
}) {
    let cookieData;
    const fallbackConfig = JSON.stringify(InitialConfig);

    try {
        cookieData = JSON.parse(configs?.value || fallbackConfig);
    } catch {
        cookieData = InitialConfig;
    }

    return cookieData;
}