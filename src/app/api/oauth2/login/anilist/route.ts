import * as arctic from "arctic";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AnilistProvider } from "@/lib/providers/OAuth2Providers";

export async function GET(): Promise<Response> {
    const cookieStore = await cookies();
    const anilist = await AnilistProvider();
    const state = arctic.generateState();
    const url = anilist.createAuthorizationURL(state);

    cookieStore.set("state", state, {
        secure:   process.env.NODE_ENV === "production",
        path:     "/",
        httpOnly: true,
        maxAge:   60 * 10,
    });

    return redirect(url.toString());
}
