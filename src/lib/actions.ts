"use server";

import {Client} from "kodikwrapper";
import {clerkClient} from "@clerk/nextjs/server";

const kodikClient = new Client({
    token: process.env.KODIK_TOKEN!,
});

export async function getKodikPlayer({ shikimoriId }: { shikimoriId: string }) {
    return await kodikClient.search({
        shikimori_id: parseInt(shikimoriId)
    }).then((response) => response.results.shift());
}

export async function getUserById({ id }: { id: string }) {
    return JSON.parse(JSON.stringify(await clerkClient.users.getUser(id)));
}