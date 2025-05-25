// refer to https://github.com/vercel/next.js/tree/canary/examples/i18n-routing

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { CookieLocaleKey, DefaultLocale } from "@/constants/localization";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

function getLocale(request: NextRequest): string | undefined {
    // eslint-disable-next-line
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const cookieLocale = request.cookies.get(CookieLocaleKey);

    if (cookieLocale?.value) {
        let parsedLocale;

        try {
            parsedLocale = JSON.parse(cookieLocale.value);
        } catch {
            parsedLocale = DefaultLocale;
        }

        if (locales.includes(parsedLocale)) {
            return parsedLocale;
        }
    }

    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    // eslint-disable-next-line unicorn/no-array-for-each
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get the best locale
    // eslint-disable-next-line
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales,
    );

    return matchLocale(languages, locales, i18n.defaultLocale);
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const searchParameters = request.nextUrl.searchParams;

    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // // If you have one
    // if (
    //   [
    //     '/manifest.json',
    //     '/favicon.ico',
    //     // Your other files in `public`
    //   ].includes(pathname)
    // )
    //   return

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en/products
        const response = NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}?${searchParameters.toString()}`,
                request.url,
            ),
        );

        response.cookies.set(CookieLocaleKey, JSON.stringify(locale), {
            httpOnly: false,
            sameSite: "lax",
            secure:   process.env.NODE_ENV === "production",
            expires:  getRelativeDate({ days: 365 }),
            path:     "/",
        });

        return response;
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|.*.webp|.*.jpg|.*.png).*)"],
};