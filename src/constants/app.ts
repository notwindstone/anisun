import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

export { default as ImagePlaceholder } from "@/../public/frieren-no-image.webp";
export const AppName = "Anisun";
export const DefaultUsername = "windstone";

export const ExtensionsLocalStorageKey = "@anisun/extensions";
export const HistoryLocalStorageKey = "@anisun/history";

export const DarkReaderNotificationLocalStorageKey = "dark-reader-hide";
export const OldBrowserNotificationLocalStorageKey = "unsupported-browser-hide";

export const HistoryEntriesLimit = 2000;

export const EntriesMaxSize = 300;

export const AccessTokenCookieKey = "accessToken";
export const AccessTokenProviderCookieKey = "tokenProvider";
export const AccountInfoCookieKey = "accountInfo";

export const AnyOption = {
    name:  "Any",
    value: "any",
};

export const getFooterItems = (dictionaries: DictionariesType) => ({
    description: dictionaries?.footer?.description,
    columns:     [
        {
            title: dictionaries?.footer?.about?.title,
            links: dictionaries?.footer?.about?.links,
        },
        {
            title: dictionaries?.footer?.contact?.title,
            links: dictionaries?.footer?.contact?.links,
        },
    ],
});
export const ServerFetchTimeout = 10_000;
export const ServerFetchErrorCount = 5;
export const InitialRouteStates = {
    "/":           {},
    "/account":    {},
    "/library":    {},
    "/extensions": {},
    "/anime":      {},
} as const;
