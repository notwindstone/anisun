import axios from "axios";
import {JikanResponseType} from "@/types/Jikan/JikanResponse.type";

export const animes = () => {
    const byId = async ({ id }: { id: string }) => {
        return await axios
            .get(`https://api.jikan.moe/v4/anime/${id}`)
            .then((response: JikanResponseType) => response.data.data)
            .catch(() => {
                return {
                    synopsis: ''
                };
            });
    };

    return {
        byId,
    };
};