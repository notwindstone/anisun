import { AnimeType } from "@/types/Anime/Anime.type";
import { GraphQLClient } from "@/lib/graphql/client";

const { query, variables } = GraphQLClient.Anilist({
    operation: "Page.Media",
    variables: {
        page: {
            page:    1,
            perPage: 30,
        },
        media: {
            type: "ANIME",
            sort: "TRENDING_DESC",
        },
    },
    fields: [
        "id",
        "idMal",
        "title.english",
        "title.native",
        "title.romaji",
        "status",
        "meanScore",
        "averageScore",
        "coverImage.extraLarge",
        "relations.nodes.title.english",
        "relations.nodes.title.native",
        "relations.nodes.title.romaji",
    ],
});

const fetchTrendingTitles = async (options?: Partial<Request> | undefined): Promise<
    Array<AnimeType>
> => {
    const response = await fetch('https://graphql.anilist.co', {
        method:  "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        ...options,
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    let data;

    try {
        data = await response.json();
    } catch (error) {
        console.error("fetchTrendingTitles.ts error:", error);

        throw new Error("Something went wrong");
    }

    return data.data.Page.media;
};

export default fetchTrendingTitles;