"use server";

import {Client} from "kodikwrapper";

export default async function getKodikPlayer({ shikimoriId }: { shikimoriId: string }) {
    const kodikClient = new Client({
        token: process.env.KODIK_TOKEN!,
    });

    return await kodikClient.search({
        shikimori_id: parseInt(shikimoriId)
    }).then((response) => response.results.shift());
}