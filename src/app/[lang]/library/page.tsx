import HistoryWrapper from "@/components/misc/HistoryWrapper/HistoryWrapper";
import AnilistLibrary from "@/components/integrations/AnilistLibrary/AnilistLibrary";
import { AccessTokenCookieKey, AccessTokenProviderCookieKey } from "@/constants/app";
import { cookies } from "next/headers";
import getAccessTokenProvider from "@/utils/oauth2/getAccessTokenProvider";

export default async function Page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AccessTokenCookieKey)?.value ?? "";
    const parsedTokenProvider = cookieStore.get(AccessTokenProviderCookieKey)?.value ?? "";

    const tokenProvider = getAccessTokenProvider(parsedTokenProvider);

    let providerLibrary: React.ReactNode;

    switch (tokenProvider) {
        case "anilist": {
            providerLibrary = (
                <AnilistLibrary
                    accessToken={accessToken}
                    tokenProvider={tokenProvider}
                />
            );
            break;
        }
        case "mal": {
            providerLibrary = (
                <AnilistLibrary
                    accessToken={accessToken}
                    tokenProvider={tokenProvider}
                />
            );
            break;
        }
        case "shikimori": {
            providerLibrary = (
                <AnilistLibrary
                    accessToken={accessToken}
                    tokenProvider={tokenProvider}
                />
            );
            break;
        }
    }

    return (
        <div className="flex flex-col p-4 gap-4 mx-auto max-w-384">
            {providerLibrary}
            <div />
            <p className="text-2xl font-medium leading-none">
                History
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Find anime titles that you have recently watched
            </p>
            <HistoryWrapper />
        </div>
    );
}
