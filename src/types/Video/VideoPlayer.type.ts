export type VideoPlayerType = {
    title?: string | null;
    player: {
        host: string;
        list: {
            episode: string;
            hls: {
                fhd?: string;
                hd?: string;
                sd?: string;
            }
        }[]
    };
};