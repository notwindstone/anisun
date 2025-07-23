"use server";

import * as arctic from "arctic";
import { NextRequest } from "next/server";
import { PageRoutes } from "@/constants/routes";
import { ErrorStrings } from "@/constants/errors";
import { setCookie } from "@/lib/actions/cookies";
import { getRelativeDate } from "@/lib/misc/getRelativeDate";
import { cookies } from "next/headers";
import { AccessTokenCookieKey, AccessTokenProviderCookieKey, AccountInfoCookieKey } from "@/constants/app";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { getUser } from "@/lib/actions/user";

export async function handleCallback({
    request,
    provider,
    providerName,
    fetchUserProfile,
}: {
    request: NextRequest;
    provider: {
        validateAuthorizationCode: (code: string) => Promise<{
            accessToken: () => string;
        }>;
    };
    providerName: OAuth2ProvidersType;
    fetchUserProfile: (accessToken: string) => Promise<Response>;
    // return the URL we need to redirect the user to
}): Promise<string> {
    let tokens;
    let accessToken;

    const requestCookieStore = request.cookies;
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    const storedState = requestCookieStore.get('state')?.value;

    if (storedState === undefined) {
        return PageRoutes.Account.Segment + ErrorStrings.OAuth2.BrowserChanged.Label;
    }

    if (code === null || state === null || state !== storedState) {
        return PageRoutes.Account.Segment + ErrorStrings.OAuth2.BadRequest.Label;
    }

    try {
        tokens = await provider.validateAuthorizationCode(code);
        accessToken = tokens.accessToken();
    } catch (error) {
        console.error("handleCallback.ts OAuth2 error:", error);

        if (error instanceof arctic.OAuth2RequestError) {
            // Invalid authorization code, credentials, or redirect URI
            return PageRoutes.Account.Segment + ErrorStrings.OAuth2.RequestError.Label;
        }

        return PageRoutes.Account.Segment + ErrorStrings.OAuth2.ServerError.Label;
    }

    const user = await getUser({
        accessToken,
        fetchUser: fetchUserProfile,
    });

    if (!user) {
        return PageRoutes.Account.Segment + ErrorStrings.OAuth2.NoUser.Label;
    }

    const cookieStore = await cookies();

    await setCookie({
        store:     cookieStore,
        key:       AccessTokenCookieKey,
        value:     accessToken,
        expiresAt: getRelativeDate({ days: 30 }),
        httpOnly:  true,
    });
    await setCookie({
        store:     cookieStore,
        key:       AccessTokenProviderCookieKey,
        value:     providerName,
        expiresAt: getRelativeDate({ days: 30 }),
        httpOnly:  true,
    });
    await setCookie({
        store:     cookieStore,
        key:       AccountInfoCookieKey,
        value:     JSON.stringify(user),
        expiresAt: getRelativeDate({ days: 30 }),
        httpOnly:  false,
    });

    return PageRoutes.Account.Root;
}
