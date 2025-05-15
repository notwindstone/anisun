import { RemoteRoutes } from "@/constants/routes";
import { MALToAnilibriaType } from "@/types/Anime/MALToAnilibria.type";

export default async function malToAnilibria(): Promise<Array<MALToAnilibriaType> | undefined> {
    let data: Array<MALToAnilibriaType>;

    try {
        const response = await fetch(RemoteRoutes.MALToAnilibriaID.Data, {
            next: {
                revalidate: 60 * 60 * 24, // 24 hours
            },
        });

        data = await response.json();
    } catch (error) {
        console.log(error);

        return undefined;
    }

    return data;
}