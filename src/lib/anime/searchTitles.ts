const searchTitles = async (search?: string | undefined): Promise<string> => {
    const query = `
        query($search: String, $perPage: Int) {
            Page(perPage: $perPage) {
                media(search: $search, type: ANIME) {
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

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: JSON.stringify({
                search: search,
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