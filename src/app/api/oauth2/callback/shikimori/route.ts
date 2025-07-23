import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { ShikimoriProvider } from "@/lib/providers/OAuth2Providers";
import { OAuth2Routes } from "@/constants/routes";
import { handleCallback } from "@/lib/oauth2/handleCallback";

export async function GET(request: NextRequest): Promise<Response> {
    const provider = await ShikimoriProvider();
    const fetchUserProfile = async (accessToken: string): Promise<Response> => {
        return await fetch(OAuth2Routes.Shikimori._FetchUser, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };

    return redirect(await handleCallback({
        request,
        provider,
        providerName: "shikimori",
        fetchUserProfile,
    }));
}
