export type AnimeInfoType = {
    anime_description: string;
    anime_episodes: number;
    anime_folder: string;
    anime_id: number;
    anime_keywords: string | null;
    anime_name: string;
    anime_name_russian: string;
    anime_paused: number;
    anime_shikimori: number;
    anime_studio: number;
    anime_year: number;
    episode_current_dub?: number;
    episode_current_sub?: number;
}[];