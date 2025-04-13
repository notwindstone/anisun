import { ConfigType } from "@/types/Configs/Config.type";
import { setCookie } from "@/lib/actions/cookies";
import { CookieConfigKey } from "@/constants/configs";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

export default async function setConfigValues({
    configs,
}: {
    configs: ConfigType | undefined;
}) {
    await setCookie({
        key: CookieConfigKey,
        value: JSON.stringify(configs),
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
}