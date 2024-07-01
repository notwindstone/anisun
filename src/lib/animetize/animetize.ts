import {animes} from "@/lib/animetize/endpoints/animes";

export const animetize = () => {
    return {
        animes: animes(),
    };
};