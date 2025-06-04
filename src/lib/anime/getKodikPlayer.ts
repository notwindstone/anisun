import { Client } from "kodikwrapper";

const KodikClient = new Client({
    token: process.env.NEXT_PUBLIC_KODIK_TOKEN!,
});

export default async function getKodikPlayer({
    idMal,
}: {
    idMal: number;
}): Promise<any> {
    const result = await KodikClient.search({
        shikimori_id: idMal,
    });

    return result.results[0];
}
