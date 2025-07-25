// For server-side translations without async .json files import
import { Locale } from "@/i18n-config";

export const HomePageItems: Array<{
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    property: string;
}> = [
    {
        title: {
            en:  "Trending Now",
            ru:  "Сейчас в тренде",
            uwu: "twending now",
        },
        description: {
            en:  "Watch the currently popular titles",
            ru:  "Смотрите популярные на данный момент тайтлы",
            uwu: "watch the cuwwentwy p-popuwaw titles",
        },
        property: "Trending",
    },
    {
        title: {
            en:  "Upcoming Next Season",
            ru:  "Аниме следующего сезона",
            uwu: "upcoming next season",
        },
        description: {
            en:  "Explore the animes that are going to be released soon",
            ru:  "Они выйдут в ближайшее время",
            uwu: "expwowe the animes that are going to be weweased soon",
        },
        property: "Upcoming",
    },
    {
        title: {
            en:  "Top 30 Anime",
            ru:  "30 лучших аниме",
            uwu: "top 30 anime",
        },
        description: {
            en:  "Check the best series sorted by a score",
            ru:  "Взгляните на лучшие тайтлы, отсортированные по рейтингу",
            uwu: "check the best sewies s-sowted b-by a score",
        },
        property: "Top",
    },
];
export const AccountPageItems: Record<Locale, {
    accountTitle:        string,
    accountDescription:  string,
    settingsTitle:       string,
    settingsDescription: string,
    languageTitle:       string,
    accentColorTitle:    string,
    layoutConfigTitle:   string,
    other:               string,
}> = {
    en: {
        accountTitle:        "Account",
        accountDescription:  "Sign in using your favourite anime social website",
        settingsTitle:       "Settings",
        settingsDescription: "Manage your settings",
        languageTitle:       "Select your language",
        accentColorTitle:    "Select an accent color",
        layoutConfigTitle:   "Select a layout color and configuration",
        other:               "Other",
    },
    ru: {
        accountTitle:        "Аккаунт",
        accountDescription:  "Войдите с помощью любимых трекеров аниме",
        settingsTitle:       "Настройки",
        settingsDescription: "Управляйте конфигурацией приложения",
        languageTitle:       "Выбрать язык",
        accentColorTitle:    "Выбрать акцентный цвет",
        layoutConfigTitle:   "Выбрать цвет фона и настройки лайаута",
        other:               "Прочее",
    },
    uwu: {
        accountTitle:        "account",
        accountDescription:  "sign in u-using youw favouwite anime sociaw website",
        settingsTitle:       "settings",
        settingsDescription: "manage y-youw settings",
        languageTitle:       "sewect youw wanguage",
        accentColorTitle:    "sewect an accent cowow",
        layoutConfigTitle:   "s-sewect a wayout cowow and configuwation",
        other:               "other",
    },
};
