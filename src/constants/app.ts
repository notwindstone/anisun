import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

export const AppName = "Anisun";
export const FaviconBlurredBase64 = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsnHzhPwAGRgLdclRpkwAAAABJRU5ErkJggg==";
export const AccessTokenCookieKey = "accessToken";
export const AccessTokenProviderCookieKey = "tokenProvider";
export const AccountInfoCookieKey = "accountInfo";
export const ImagePlaceholder = "/frieren-no-image.webp";
export const getFooterItems = (dictionaries: DictionariesType) => ({
    description: dictionaries?.footer?.description,
    columns: [
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