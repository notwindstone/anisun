const fetchAnilibriaVideo = async (anilibriaId: number): Promise<any> => {
    let anime;

    try {
        const response = await fetch(`https://api.anilibria.tv/v3/title?id=${anilibriaId}`);
        anime = await response.json();
    } catch {
        return undefined;
    }

    return "https://cache.libria.fun" + anime?.player?.list?.["1"]?.hls?.fhd;
};

export default fetchAnilibriaVideo;