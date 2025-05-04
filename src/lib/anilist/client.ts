import { Media } from "@/lib/anilist/endpoints/media";

export const AnilistClient = () => {
    return {
        List: {
            Media: Media.Page,
        },
        Item: {
            Media: Media.Default,
        },
    };
};