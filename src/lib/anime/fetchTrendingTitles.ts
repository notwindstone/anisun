import { AnimeType } from "@/types/Anime/Anime.type";

// TODO implement a GraphQL query builder
const fetchTrendingTitles = async (options?: Partial<Request> | undefined): Promise<
    Array<AnimeType>
> => {
    const query = `
        query($perPage: Int) {
            Page(perPage: $perPage) {
                media(sort: TRENDING_DESC, type: ANIME) {
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

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: JSON.stringify({
                perPage: 32,
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