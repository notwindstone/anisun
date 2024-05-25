"use server";

import {Client} from "kodikwrapper";

const kodikClient = new Client({
    token: process.env.KODIK_TOKEN!,
});

export async function getKodikPlayer({ shikimoriId }: { shikimoriId: string }) {
    return await kodikClient.search({
        shikimori_id: parseInt(shikimoriId)
    }).then((response) => response.results.shift());
}