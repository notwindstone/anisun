import { setCookie } from "@/lib/actions/cookies";
import { CookieConfigKey } from "@/constants/configs";
import { getRelativeDate } from "@/lib/misc/getRelativeDate";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { setCookie as setCookiesClient } from 'cookies-next/client';


export default async function setConfigValues({
    configs,
}: {
    configs: SafeConfigType | undefined;
}) {
    await setCookie({
        key:       CookieConfigKey,
        value:     JSON.stringify(configs),
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly:  false,
    });
}

export function setConfigValuesClient({
    configs,
}: {
    configs: SafeConfigType | undefined;
}) {
    setCookiesClient(CookieConfigKey, configs, {
        httpOnly: false,
        sameSite: "lax",
        secure:   process.env.NODE_ENV === "production",
        expires:  getRelativeDate({ days: 365 }),
        path:     "/",
    });
}
