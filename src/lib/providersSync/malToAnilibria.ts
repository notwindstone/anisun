import { RemoteRoutes } from "@/constants/routes";
import { MALToAnilibriaType } from "@/types/Anime/MALToAnilibria.type";

export default async function malToAnilibria({
    idMal,
}: {
    idMal: number;
}): Promise<number | undefined> {
    let animes: Array<MALToAnilibriaType>;

    try {
        const response = await fetch(RemoteRoutes.MALToAnilibriaID.Data, {
            next: {
                revalidate: 60 * 60 * 24, // 24 hours
            },
        });

        animes = await response.json();
    } catch {
        return undefined;
    }

    for (const anime of animes) {
        if (anime.myanimelist_id == idMal) {
            return anime.anilibria_id;
        }
    }

    return undefined;
}