import { AnimeType } from "@/types/Anime/Anime.type";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

// If it's January 1, then ofc there will be no good animes
// that were released on January 1, so we go back 30 days before.
const currentAnimeYear = getRelativeDate({ days: -30 }).getFullYear();

const fetchTrendingTitles = async (options?: Partial<Request> | undefined): Promise<
    Array<AnimeType>
> => {
    const query = `
        query($perPage: Int, $seasonYear: Int) {
            Page(perPage: $perPage) {
                media(sort: POPULARITY_DESC, type: ANIME, seasonYear: $seasonYear) {
                    id
                    idMal
                    status
                    title { english native romaji }
                    meanScore
                    genres
                    averageScore
                    coverImage {
                        extraLarge
                    }
                }
            }
        }
    `;

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: JSON.stringify({
                seasonYear: currentAnimeYear,
                perPage: 24,
            }),
        }),
        ...options,
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error("Something went wrong");
    }

    return data.data.Page.media;
};

export default fetchTrendingTitles;