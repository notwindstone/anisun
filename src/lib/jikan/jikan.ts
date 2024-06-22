import {animes} from "@/lib/jikan/endpoints/animes";

export const jikan = () => {
    return {
        animes: animes(),
    };
};