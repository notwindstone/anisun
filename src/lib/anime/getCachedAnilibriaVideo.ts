// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ErrorStrings } from "@/constants/errors";

const getCachedAnilibriaVideo = async (anilibriaId: number): Promise<any> => {
    let anime;

    try {
        const response = await fetch(`/cached/anilibria.json`);
        const body = await response.json();

        // TODO
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        anime = body.find((cachedAnime: any) => {
            return cachedAnime.id === anilibriaId;
        });
    } catch (error) {
        console.error("fetchAnilibriaVideo.ts error:", error);

        return undefined;
    }

    const playerURL = anime?.player?.list?.["1"]?.hls?.fhd;

    if (!playerURL) {
        return ErrorStrings.Player.UnableToFind.Label;
    }

    return "https://cache.libria.fun" + playerURL;
};

export default getCachedAnilibriaVideo;
