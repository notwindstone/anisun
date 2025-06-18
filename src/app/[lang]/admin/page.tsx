import { cookies } from "next/headers";
import { AccessTokenCookieKey, AccessTokenProviderCookieKey } from "@/constants/app";
import SubmitToDatabase from "@/components/admin/SubmitToDatabase/SubmitToDatabase";
import { validateUser } from "@/lib/actions/user";
import getAccessTokenProvider from "@/utils/oauth2/getAccessTokenProvider";

export default async function Page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AccessTokenCookieKey)?.value;
    const parsedTokenProvider = cookieStore.get(AccessTokenProviderCookieKey)?.value;

    if (!accessToken || !parsedTokenProvider) {
        return (
            <>
                <div className="p-4 max-w-384 mx-auto">
                    You are not supposed to be here. Sign in first.
                </div>
            </>
        );
    }

    const tokenProvider = getAccessTokenProvider(parsedTokenProvider);

    if (!tokenProvider) {
        return (
            <>
                <div className="p-4 max-w-384 mx-auto">
                    Did you tamper with cookies?
                </div>
            </>
        );
    }

    const user = await validateUser({
        accessToken,
        tokenProvider,
    });

    if (user === "error") {
        return (
            <>
                <div className="p-4 max-w-384 mx-auto">
                    An unexpected error...
                </div>
            </>
        );
    }

    if (user === "user") {
        return (
            <>
                <div className="p-4 max-w-384 mx-auto">
                    You are not supposed to be here.
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-4 p-4 max-w-384 mx-auto">
                <p>
                    Time to write some data to the database?
                </p>
                <div>
                    <SubmitToDatabase
                        accessToken={accessToken}
                        tokenProvider={tokenProvider}
                    />
                </div>
            </div>
        </>
    );
}
