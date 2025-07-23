import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";

const oauth2ProvidersArray: Array<OAuth2ProvidersType> = [
    "mal", "anilist", "shikimori",
];

export default function getAccessTokenProvider(parsedTokenProvider: string) {
    for (const provider of oauth2ProvidersArray) {
        if (provider === parsedTokenProvider) {
            return provider;
        }
    }
}
