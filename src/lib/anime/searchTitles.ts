import { SearchType } from "@/types/Anime/Search.type";

const searchTitles = async (options: Partial<SearchType> | undefined): Promise<string> => {
    const query = `
        query($search: String, $idMal: Int, $perPage: Int) {
            Page(perPage: $perPage) {
                media(search: $search, idMal: $idMal, type: ANIME) {
                    id
                    idMal
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
    
    const variables = options?.type === "name" ? {
        search: options?.search,
    } : {
        idMal: options?.search,
    };

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
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
    } catch {
        throw new Error("Something went wrong");
    }

    return data.data.Page.media;
};

export default searchTitles;