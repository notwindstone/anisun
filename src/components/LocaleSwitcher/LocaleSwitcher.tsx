"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";
import { setCookie } from "@/lib/actions/cookies";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { CookieLocaleKey, LocaleItems } from "@/constants/localization";
import Button from "@/components/Button/Button";

const handleLocaleSwitch = async (locale: Locale) => {
    await setCookie({
        key: CookieLocaleKey,
        value: JSON.stringify(locale),
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
};

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const currentLocale = pathname.split("/")[1];
    const redirectedPathname = (locale: Locale) => {
        if (!pathname) {
            return "/";
        }

        const segments = pathname.split("/");

        segments[1] = locale;

        return segments.join("/");
    };

    return (
        <>
            {
                i18n.locales.map((locale) => {
                    const { name, icon } = LocaleItems[locale];

                    return (
                        <Link
                            className="w-fit h-fit rounded-md"
                            key={locale}
                            href={redirectedPathname(locale)}
                            onClick={() => handleLocaleSwitch(locale)}
                        >
                            <Button
                                custom={{
                                    style: currentLocale === locale
                                        ? "default"
                                        : "base",
                                }}
                                label={`${name} locale selector`}
                            >
                                <div className="fill-black dark:fill-white leading-none drop-shadow-xs drop-shadow-[#0005]">
                                    {icon}
                                </div>
                                <p>
                                    {name}
                                </p>
                            </Button>
                        </Link>
                    );
                })
            }
        </>
    );
}