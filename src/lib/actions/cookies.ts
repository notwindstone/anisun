"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function getCookie({
    key,
    store,
}: {
    key: string;
    store?: ReadonlyRequestCookies;
}): Promise<RequestCookie | undefined> {
    // passing already defined cookieStore is faster
    // than redefining it on every function call
    if (!store) {
        const cookieStore = await cookies();

        return cookieStore.get(key);
    }

    return store.get(key);
}

export async function getCookiesArray({
    keys,
    store,
}: {
    keys: Array<string>;
    store?: ReadonlyRequestCookies;
}): Promise<Array<RequestCookie | undefined>> {
    const storedCookies: Array<RequestCookie | undefined> = [];

    // passing already defined cookieStore is faster
    // than redefining it on every function call
    if (!store) {
        const cookieStore = await cookies();

        for (const key of keys) {
            storedCookies.push(cookieStore.get(key));
        }

        return storedCookies;
    }

    for (const key of keys) {
        storedCookies.push(store.get(key));
    }

    return storedCookies;
}

export async function setCookie({
    key,
    value,
    expiresAt,
    httpOnly,
    store,
}: {
    key: string;
    value: string;
    expiresAt: Date;
    httpOnly: boolean;
    store?: ReadonlyRequestCookies;
}): Promise<void> {
    const cookieStore = store ?? await cookies();

    cookieStore.set(key, value, {
        httpOnly: httpOnly,
        sameSite: "lax",
        secure:   process.env.NODE_ENV === "production",
        expires:  expiresAt,
        path:     "/",
    });
}

export async function deleteCookie({
    key,
    store,
}: {
    key: string;
    store?: ReadonlyRequestCookies;
}): Promise<void> {
    const cookieStore = store ?? await cookies();

    cookieStore.set(key, "", {
        httpOnly: false,
        sameSite: "lax",
        secure:   process.env.NODE_ENV === "production",
        maxAge:   0,
        path:     "/",
    });
}
