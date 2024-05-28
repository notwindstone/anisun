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
    };
    torrents: {
        episodes: {
            first: number;
            last: number;
            string: `${number}-${number}`;
        };
        list: {
            downloads: number;
            episodes: {
                first: number;
                last: number;
                string: `${number}-${number}`;
            };
            hash: string;
            leechers: number;
            magnet: string;
            metadata: unknown | null;
            quality: {
                encoder: string;
                lq_audio: unknown | null;
                resolution: string;
                string: string;
                type: string;
            };
            raw_base64_file: unknown | null;
            seeders: number;
            size_string: string;
            torrent_id: number;
            total_size: number;
            uploaded_timestamp: number;
            url: string;
        }[];
    };
};