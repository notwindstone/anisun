import { Locale } from "@/i18n-config";

export const CookieLocaleKey = "locale";
export const DefaultLocale = "en";
// don't change "en" | "ru" to the Locale type, because exported
// type takes its types from this const
export const Locales: Array<"en" | "ru"> = ["en", "ru"];
export const LocaleItems: Record<Locale, {
    name: string;
    icon: string;
}> = {
    en: {
        name: "English",
        icon: "🇺🇸",
    },
    ru: {
        name: "Русский",
        icon: "🇷🇺",
    },
};