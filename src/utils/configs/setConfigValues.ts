import { setCookie } from "@/lib/actions/cookies";
import { CookieConfigKey } from "@/constants/configs";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";

export default async function setConfigValues({
    configs,
}: {
    configs: SafeConfigType | undefined;
}) {
    await setCookie({
        key: CookieConfigKey,
        value: JSON.stringify(configs),
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
}