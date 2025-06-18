import { SearchType } from "@/types/Anime/Search.type";
import { AnimeType } from "@/types/Anime/Anime.type";

// TODO refactor
const searchTitles = async (options: Partial<SearchType> | undefined): Promise<
    Record<
        string,
        (AnimeType | {
            media: Array<AnimeType>;
        })
    >
> => {
    const query = `
        query($search: String, $idMal: Int, $perPage: Int) {
            Page(perPage: $perPage) {
                media(search: $search, idMal: $idMal, type: ANIME) {
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
                    relations {
                        nodes {
                            title { english native romaji }
                        }
                    }
                }
            }
        }
    `;

    const variables = options?.type === "name" ? {
        search: options?.search,
    } : {
        idMal: options?.search,
    };

    const response = await fetch('https://graphql.anilist.co', {
        method:  'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query:     query,
            variables: JSON.stringify({
                ...variables,
                perPage: 32,
            }),
        }),
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    let data;

    try {
        data = await response.json();
    } catch (error) {
        console.error("searchTitles.ts error:", error);

        throw new Error("Something went wrong");
    }

    return data.data.Page.media;
};

export default searchTitles;
