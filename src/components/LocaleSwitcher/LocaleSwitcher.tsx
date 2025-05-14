"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";
import { setCookie } from "@/lib/actions/cookies";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { CookieLocaleKey } from "@/constants/localization";
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
                    return (
                        <Link
                            key={locale}
                            href={redirectedPathname(locale)}
                            onClick={() => handleLocaleSwitch(locale)}
                        >
                            <Button
                                custom={{
                                    style: "base",
                                }}
                                label={`${locale} locale selector`}
                            >
                                {locale}
                            </Button>
                        </Link>
                    );
                })
            }
        </>
    );
}