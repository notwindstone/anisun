import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

export { default as ImagePlaceholder } from "@/../public/frieren-no-image.webp";
export const AppName = "Anisun";

export const ExtensionsLocalStorageKey = "@anisun/extensions";
export const HistoryLocalStorageKey = "@anisun/history";

export const HistoryEntriesLimit = 2000;
export const HistoryEntriesCountOnPage = 50;

export const LibraryChunkSize = 18;

export const AccessTokenCookieKey = "accessToken";
export const AccessTokenProviderCookieKey = "tokenProvider";
export const AccountInfoCookieKey = "accountInfo";

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
export const ServerFetchTimeout = 3000;
export const ServerFetchErrorCount = 5;
