// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchAnilibriaVideo = async (anilibriaId: number): Promise<any> => {
    let anime;

    try {
        const response = await fetch(`https://api.anilibria.tv/v3/title?id=${anilibriaId}`);
        anime = await response.json();
    } catch (error) {
        console.error("fetchAnilibriaVideo.ts error:", error);

        return undefined;
    }

    return "https://cache.libria.fun" + anime?.player?.list?.["1"]?.hls?.fhd;
};

export default fetchAnilibriaVideo;