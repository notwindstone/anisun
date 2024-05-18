import {animes} from "@/lib/shikimori/endpoints/animes";

export const client = () => {
    return {
        animes: animes()
    }
}