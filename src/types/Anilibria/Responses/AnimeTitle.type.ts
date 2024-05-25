export type AnimeTitleType = {
    names: {
        ru: string | null;
        en: string;
        alternative: string | null;
    };
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
    }
};