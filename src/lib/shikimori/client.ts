import {animes} from "@/lib/shikimori/endpoints/animes";
import {genres} from "@/lib/shikimori/endpoints/genres";

export const client = () => {
    return {
        animes: animes(),
        genres: genres(),
    };
};