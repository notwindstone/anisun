"use server";

import * as arctic from "arctic";
import { NextRequest } from "next/server";
import { PageRoutes } from "@/constants/routes";
import { ErrorStrings } from "@/constants/errors";
import { UserType } from "@/types/OAuth2/User.type";
import { getUniversalUser } from "@/utils/oauth2/getUniversalUser";
import { setCookie } from "@/lib/actions/cookies";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

export async function handleCallback({
    request,
    provider,
    fetchUserProfile,
}: {
    request: NextRequest;
    provider: {
        validateAuthorizationCode: (code: string) => Promise<{
            accessToken: () => string;
        }>;
    };
    fetchUserProfile: (accessToken: string) => Promise<Response>;
}): Promise<string> {
    let tokens;
    let accessToken;

    const cookieStore = request.cookies;
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    const storedState = cookieStore.get('state')?.value;

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
        if (error instanceof arctic.OAuth2RequestError) {
            // Invalid authorization code, credentials, or redirect URI
            return PageRoutes.Account.Segment + ErrorStrings.OAuth2.RequestError.Label;
        }

        return PageRoutes.Account.Segment + ErrorStrings.OAuth2.ServerError.Label;
    }

    const response = await fetchUserProfile(accessToken);

    let user: UserType;

    try {
        const data = await response.json();

        user = getUniversalUser({
            user: data,
        });
    } catch {
        return PageRoutes.Account.Segment + ErrorStrings.OAuth2.ServerError.Label;
    }

    const {
        username,
        avatar,
    } = user;

    await setCookie({
        key: "",
        value: "",
        expiresAt: getRelativeDate({ days: 30 }),
        httpOnly: true,
    });
    await setCookie({
        key: "",
        value: "",
        expiresAt: getRelativeDate({ days: 30 }),
        httpOnly: true,
    });

    return PageRoutes.Account.Root;
}