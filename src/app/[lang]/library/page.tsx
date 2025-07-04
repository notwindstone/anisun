import HistoryWrapper from "@/components/layout/HistoryWrapper/HistoryWrapper";
import {
    AccessTokenCookieKey,
    AccessTokenProviderCookieKey,
    AccountInfoCookieKey,
    DefaultUsername,
} from "@/constants/app";
import { cookies } from "next/headers";
import getAccessTokenProvider from "@/utils/oauth2/getAccessTokenProvider";
import readCookiesData from "@/utils/configs/readCookiesData";
import { UserType } from "@/types/OAuth2/User.type";
import getSafeAccountData from "@/utils/configs/getSafeAccountData";
import AnilistLibraryWrapper from "@/components/integrations/AnilistLibraryWrapper/AnilistLibraryWrapper";
import { PlaceholderAccount } from "@/constants/configs";

export default async function Page() {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get(AccessTokenCookieKey)?.value;
    const parsedTokenProvider = cookieStore.get(AccessTokenProviderCookieKey)?.value ?? "";
    const accountInfo = cookieStore.get(AccountInfoCookieKey);

    // yeah ik that `any_type | unknown` becomes just `unknown`
    const parsedAccountInfoData = readCookiesData<UserType | unknown>({
        data:         accountInfo,
        fallbackData: PlaceholderAccount,
    });

    const safeAccountValues = getSafeAccountData({
        account: parsedAccountInfoData,
    });

    const tokenProvider = getAccessTokenProvider(parsedTokenProvider);

    let providerLibrary: React.ReactNode;

    switch (tokenProvider) {
        case "anilist": {
            providerLibrary = (
                <AnilistLibraryWrapper
                    username={safeAccountValues.username}
                    accessToken={accessToken}
                    tokenProvider={tokenProvider}
                />
            );
            break;
        }
        case "mal": {
            providerLibrary = (
                <AnilistLibraryWrapper
                    username={safeAccountValues.username}
                    accessToken={accessToken}
                    tokenProvider={tokenProvider}
                />
            );
            break;
        }
        case "shikimori": {
            providerLibrary = (
                <AnilistLibraryWrapper
                    username={safeAccountValues.username}
                    accessToken={accessToken}
                    tokenProvider={tokenProvider}
                />
            );
            break;
        }
        default: {
            providerLibrary = (
                <AnilistLibraryWrapper
                    username={DefaultUsername}
                    accessToken={accessToken}
                    tokenProvider={"anilist"}
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
