import database from "@/db";
import { MALToAnilibriaSchema } from "@/db/schema";

export default async function malToAnilibria({
    idMal,
}: {
    idMal: number;
}): Promise<number | undefined> {
    let animes;

    try {
        animes = await database.select().from(MALToAnilibriaSchema);
    } catch (error) {
        console.error("malToAnilibria.ts error:", error);

        return undefined;
    }

    for (const anime of animes) {
        if (anime.idMal === idMal) {
            return anime.idAnilibria;
        }
    }

    return undefined;
}
