import { cookies } from "next/headers";
import { AccessTokenCookieKey, AccessTokenProviderCookieKey } from "@/constants/app";
import { OAuth2Routes } from "@/constants/routes";
import SubmitToDatabase from "@/components/admin/SubmitToDatabase/SubmitToDatabase";

export default async function Page() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AccessTokenCookieKey)?.value;
    const tokenProvider = cookieStore.get(AccessTokenProviderCookieKey)?.value;

    if (!accessToken || !tokenProvider) {
        return (
            <>
                <div className="p-4 max-w-384 mx-auto">
                    You are not supposed to be here.
                </div>
            </>
        );
    }

    let user;

    try {
        const data = await fetch(OAuth2Routes.Shikimori._FetchUser, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: {
                revalidate: 60 * 30, // 30 minutes cache
            },
        });

        user = await data.json();
    } catch {
        return (
            <>
                <div className="p-4 max-w-384 mx-auto">
                    An unexpected error...
                </div>
            </>
        );
    }

    // my shikimori account id
    if (user.id !== 1_452_707) {
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
