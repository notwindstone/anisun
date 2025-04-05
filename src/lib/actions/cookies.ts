"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getCookie({
    key,
}: {
    key: string;
}): Promise<RequestCookie | undefined> {
    const cookieStore = await cookies();

    return cookieStore.get(key);
}

export async function setCookie({
    key,
    value,
    expiresAt,
    httpOnly,
}: {
    key: string;
    value: string;
    expiresAt: Date;
    httpOnly: boolean;
}): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(key, value, {
        httpOnly: httpOnly,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/",
    });
}

export async function deleteCookie({
    key,
    httpOnly,
}: {
    key: string;
    value: string;
    expiresAt: Date;
    httpOnly: boolean;
}): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(key, "", {
        httpOnly: httpOnly,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
    });
}