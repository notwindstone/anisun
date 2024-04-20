export type AnimeTitleResponseType = {
    names: {
        ru: string;
    }
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
    },
}