import { AnimeType } from "@/types/Anime/Anime.type";
import { LibraryChunkSize } from "@/constants/app";

export default function divideMediaListCollectionToChunks({
    data,
}: {
    data: Record<string, {
        media: AnimeType
    } | {
        media: {
            media: AnimeType
        }[]
    }>;
}) {
    if (
        !("lists" in data.Library) ||
        !Array.isArray(data.Library.lists)
    ) {
        return {
            categories: [],
            lists:      [],
        };
    }

    // slice anime entries into chunks to improve performance
    const categories = [];
    const allChunkedLists = [];

    // contains every anime entry from the list (there might be duplicates)
    const allAnimeEntriesInChunks: Record<number, Array<{
        media:    AnimeType;
        progress: number;
        score:    number;
    }>> = [];

    // for `allAnimeEntriesInChunks`
    let globalIndex = 0;
    let totalAnimes = 0;

    for (const entry of data.Library.lists) {
        categories.push(entry.name);

        let index = 0;
        const currentChunks: Record<number, Array<{
            media:    AnimeType;
            progress: number;
            score:    number;
        }>> = {};

        for (const anime of entry.entries) {
            const chunkIndex = Math.floor(index / LibraryChunkSize);
            // for `allAnimeEntriesInChunks`
            const globalChunkIndex = Math.floor(globalIndex / LibraryChunkSize);

            if (!allAnimeEntriesInChunks[globalChunkIndex]) {
                allAnimeEntriesInChunks[globalChunkIndex] = [];
            }

            if (!currentChunks[chunkIndex]) {
                currentChunks[chunkIndex] = [];
            }

            allAnimeEntriesInChunks[globalChunkIndex].push(anime);
            currentChunks[chunkIndex].push(anime);

            index++;
            globalIndex++;
            totalAnimes++;
        }

        allChunkedLists.push({
            total:   entry.entries.length,
            entries: currentChunks,
        });
    }

    // to display `allAnimeEntriesInChunks`
    categories.push("Merged");
    allChunkedLists.push({
        total:   totalAnimes,
        entries: allAnimeEntriesInChunks,
    });

    return {
        categories: categories,
        lists:      allChunkedLists,
    };
}
