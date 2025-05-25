import { DefaultLocale, Locales } from "@/constants/localization";

export const i18n = {
    defaultLocale: DefaultLocale,
    locales:       Locales,
} as const;

export type Locale = (typeof i18n)["locales"][number];