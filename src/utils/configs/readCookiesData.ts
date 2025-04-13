import { InitialConfig } from "@/constants/configs";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ConfigType } from "@/types/Configs/Config.type";

export default function readCookiesData({
    configs,
}: {
    configs: RequestCookie | undefined;
}): ConfigType {
    let cookieData: ConfigType;
    const fallbackConfig = JSON.stringify(InitialConfig);

    try {
        cookieData = JSON.parse(configs?.value || fallbackConfig);
    } catch {
        cookieData = InitialConfig;
    }

    return cookieData;
}