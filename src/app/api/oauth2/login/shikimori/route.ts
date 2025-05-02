import * as arctic from "arctic";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ShikimoriProvider } from "@/utils/providers/OAuth2Providers";

export async function GET(): Promise<Response> {
    const cookieStore = await cookies();
    const shikimori = await ShikimoriProvider();
    const state = arctic.generateState();
    const url = shikimori.createAuthorizationURL(state);

    cookieStore.set("state", state, {
        secure: process.env.NODE_ENV === "production",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,
    });

    return redirect(url.toString());
}