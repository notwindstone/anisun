import {animes} from "@/lib/animetize/endpoints/watch";

export const animetize = () => {
    return {
        animes: animes(),
    };
};