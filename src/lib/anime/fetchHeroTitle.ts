import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { AnimeType } from "@/types/Anime/Anime.type";

// If it's January 1, then ofc there will be no good animes
// that were released on January 1, so we go back 30 days before.
const currentAnimeYear = getRelativeDate({ days: -30 }).getFullYear();

// TODO implement a GraphQL query builder
const fetchHeroTitle = async (options?: Partial<Request> | undefined): Promise<AnimeType> => {
    const query = `
        query($seasonYear: Int) {
            Media(type: ANIME, seasonYear: $seasonYear, status: RELEASING, sort: POPULARITY_DESC, format: TV, isAdult: false) {
                id
                idMal
                title { english native romaji }
                meanScore
                averageScore
                coverImage {
                    extraLarge
                }
                genres
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

    return data.data.Media;
};

export default fetchHeroTitle;