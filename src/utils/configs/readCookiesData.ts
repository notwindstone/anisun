import { InitialConfig } from "@/constants/configs";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";

export default function readCookiesData({
    configs,
}: {
    configs: RequestCookie | undefined;
}): ParsedConfigType {
    let cookieData: ParsedConfigType;
    const fallbackConfig = JSON.stringify(InitialConfig);

    try {
        cookieData = JSON.parse(configs?.value || fallbackConfig);
    } catch {
        cookieData = InitialConfig;
    }

    return cookieData;
}