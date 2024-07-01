import axios from "axios";

export const animes = () => {
    const getLink = async ({ id, episode }: { id: string, episode: number }) => {
        return await axios
            .get(`https://animetize-api.vercel.app/watch/${id}-episode-${episode}`)
            .then((response: {
                data: {
                    headers: {
                        Referer: string;
                    },
                }
            }) => response.data)
            .catch(() => {
                return {
                    headers: {
                        Referer: undefined
                    }
                };
            });
    };

    return {
        getLink,
    };
};