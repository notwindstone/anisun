"use server";

import database from "@/db";
import { MALToAnilibriaSchema, MALToSovetRomanticaSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateUser } from "@/lib/actions/user";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";

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
    tokenProvider: OAuth2ProvidersType;
    isRemove?: boolean | undefined;
}) {
    const user = await validateUser({
        accessToken,
        tokenProvider,
    });

    if (user === "error") {
        return "Error";
    }

    if (user === "user") {
        return "Not allowed";
    }

    if (isRemove) {
        try {
            await database.delete(MALToAnilibriaSchema).where(eq(MALToAnilibriaSchema.idMal, idMal));
        } catch {
            return "Error";
        }
    }

    try {
        await database.insert(MALToAnilibriaSchema).values({
            idAnilibria,
            idMal,
        });
    } catch {
        return "Error";
    }

    return "Success";
}

async function getFromDB({
    accessToken,
    tokenProvider,
    schema,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
    schema: typeof MALToSovetRomanticaSchema | typeof MALToAnilibriaSchema;
}) {
    const user = await validateUser({
        accessToken,
        tokenProvider,
    });

    if (user === "error") {
        return "Error";
    }

    if (user === "user") {
        return "Not allowed";
    }

    let data;

    try {
        data = await database.select().from(schema);
    } catch {
        return "Error";
    }

    return data;
}

export async function getAnilibriaSyncDB({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    return await getFromDB({
        schema: MALToAnilibriaSchema,
        tokenProvider,
        accessToken,
    });
}

export async function getSovetRomanticaSyncDB({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    return await getFromDB({
        schema: MALToSovetRomanticaSchema,
        tokenProvider,
        accessToken,
    });
}
