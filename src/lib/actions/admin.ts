"use server";

import database from "@/db";
import { MALToAnilibriaSchema } from "@/db/schema";
import { OAuth2Routes } from "@/constants/routes";
import { eq } from "drizzle-orm";

export async function writeToAnilibriaSyncDB({
    idMal,
    idAnilibria,
    accessToken,
    tokenProvider,
    isRemove,
}: {
    idMal: number;
    idAnilibria: number;
    accessToken: string;
    tokenProvider: string;
    isRemove?: boolean | undefined;
}) {
    console.log(tokenProvider);
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
        return "Error";
    }

    // my shikimori account id
    if (user.id !== 1_452_707) {
        return "Not allowed";
    }

    try {
        // eslint-disable-next-line
        if (isRemove) {
            await database.delete(MALToAnilibriaSchema).where(eq(MALToAnilibriaSchema.idMal, idMal));
        } else {
            await database.insert(MALToAnilibriaSchema).values({
                idAnilibria,
                idMal,
            });
        }
    } catch {
        return "Error";
    }

    return "Success";
}

export async function getAnilibriaSyncDB({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: string;
}) {
    console.log(tokenProvider);
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
        return "Error";
    }

    // my shikimori account id
    if (user.id !== 1_452_707) {
        return "Not allowed";
    }

    let data;

    try {
        data = await database.select().from(MALToAnilibriaSchema);
    } catch {
        return "Error";
    }

    return data;
}
