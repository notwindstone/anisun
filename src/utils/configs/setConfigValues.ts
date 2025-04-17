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

export function setConfigValuesClient({
    configs,
    document,
}: {
    configs: SafeConfigType | undefined;
    document: Document;
}) {
    const splitKey = "; ";
    const configCookieKey = `${CookieConfigKey}=`;
    const cookiesData: string[] = document.cookie.split(splitKey);
    const configCookies = cookiesData.find((row) => {
        return row.startsWith(configCookieKey);
    });

    if (!configCookies) {
        cookiesData.push(
            `${configCookieKey}${encodeURIComponent(
                JSON.stringify(configs),
            )}; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Lax; Secure`,
        );
        document.cookie = cookiesData.join(splitKey);

        return;
    }

    console.log(configCookies)
    console.log(JSON.parse(decodeURIComponent(document.cookie
        .split("; ")
        .find((row) => row.startsWith("configs="))
        ?.split("=")[1] ?? "")));
}