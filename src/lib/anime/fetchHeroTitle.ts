import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { AnimeType } from "@/types/Anime/Anime.type";
import { GraphQLClient } from "@/lib/graphql/client";

// If it's January 1, then ofc there will be no good animes
// that were released on January 1, so we go back 30 days before.
const currentAnimeYear = getRelativeDate({ days: -30 }).getFullYear();
const { query, variables } = GraphQLClient.Anilist({
    operation: "Media",
    variables: {
        media: {
            type:       "ANIME",
            seasonYear: currentAnimeYear,
            status:     "RELEASING",
            sort:       "POPULARITY_DESC",
            format:     "TV",
        },
    },
    fields: [
        "id",
        "idMal",
        "title.english",
        "title.native",
        "title.romaji",
        "description",
        "meanScore",
        "averageScore",
        "coverImage.extraLarge",
        "genres",
        "relations.nodes.title.english",
        "relations.nodes.title.native",
        "relations.nodes.title.romaji",
    ],
});

const fetchHeroTitle = async (options?: Partial<Request> | undefined): Promise<AnimeType> => {
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
        console.error("fetchHeroTitle.ts error:", error);

        throw new Error("Something went wrong");
    }

    return data.data.Media;
};

export default fetchHeroTitle;