import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { AnilistProvider } from "@/utils/providers/OAuth2Providers";
import { OAuth2Routes } from "@/constants/routes";
import { handleCallback } from "@/lib/oauth2/handleCallback";

export async function GET(request: NextRequest): Promise<Response> {
    const provider = await AnilistProvider();
    const fetchUserProfile = async (accessToken: string): Promise<Response> => {
        return await fetch(OAuth2Routes.Anilist._FetchUserURL, {
            method:  "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...OAuth2Routes.Anilist._FetchUserHeaders,
            },
            body: OAuth2Routes.Anilist._FetchUserQuery,
        });
    };

    return redirect(await handleCallback({
        request,
        provider,
        providerName: "anilist",
        fetchUserProfile,
    }));
}
