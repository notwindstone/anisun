import { AnimeType } from "@/types/Anime/Anime.type";
import simpleMatch from "@/lib/misc/simpleMatch";

export default function getCurrentAnimeChunk({
    data,
    selectedList,
    debouncedSearch,
    safePage,
    passedChunkSize,
}: {
    data: {
        categories: Array<string>,
        lists:      Array<{
            total:   number;
            entries: Record<number, Array<{
                media:    AnimeType;
                progress: number;
                score:    number;
            }>>;
        }>,
    };
    selectedList:    string | undefined;
    debouncedSearch: string;
    safePage:        number;
    passedChunkSize: number;
}): {
    total: number;
    index: number;
    list:  Array<{
        media:    AnimeType;
        progress: number;
        score:    number;
    }>;
} {
    let selectedIndex = data.categories.indexOf(selectedList ?? "");

    if (selectedIndex === -1) {
        selectedIndex = 0;
    }

    if (debouncedSearch !== "") {
        const currentEntries = data.lists[selectedIndex].entries;

        const selectedChunksCount = Object.keys(currentEntries).length;
        const foundAnimesNotFlat: Array<Array<{
            media: AnimeType;
            progress: number;
            score: number;
        }>> = [];
        const lowerCasedSearch = debouncedSearch.toLowerCase();

        for (let chunkIndex = 0; chunkIndex < selectedChunksCount; chunkIndex++) {
            const chunkedAnimes = currentEntries?.[chunkIndex];
            const filteredAnimes = chunkedAnimes?.filter((chunkedAnime) => {
                const currentMedia = chunkedAnime?.media;

                const englishTitle = currentMedia?.title?.english?.toLowerCase() ?? "";
                const romajiTitle = currentMedia?.title?.romaji?.toLowerCase() ?? "";
                const japaneseTitle = currentMedia?.title?.native?.toLowerCase() ?? "";

                const isInEnglish = simpleMatch(
                    englishTitle,
                    lowerCasedSearch,
                );
                const isInRomaji = simpleMatch(
                    romajiTitle,
                    lowerCasedSearch,
                );
                const isInNative = simpleMatch(
                    japaneseTitle,
                    lowerCasedSearch,
                );

                return isInEnglish || isInRomaji || isInNative;
            });

            if (filteredAnimes.length > 0) {
                foundAnimesNotFlat.push(filteredAnimes);
            }
        }

        const flattenedFoundAnimes = foundAnimesNotFlat.flat();

        let newChunksIndex = 0;
        const newChunks: Record<number, Array<{
            media: AnimeType;
            progress: number;
            score: number;
        }>> = {};

        for (const anime of flattenedFoundAnimes) {
            const chunkIndex = Math.floor(newChunksIndex / passedChunkSize);

            if (!newChunks[chunkIndex]) {
                newChunks[chunkIndex] = [];
            }

            newChunks[chunkIndex].push(anime);

            newChunksIndex++;
        }

        return {
            total: Object.keys(newChunks).length,
            index: selectedIndex,
            list:  newChunks[safePage - 1],
        };
    }

    return {
        total: Math.ceil((data?.lists?.[selectedIndex]?.total ?? 1) / passedChunkSize),
        index: selectedIndex,
        list:  data.lists[selectedIndex].entries[safePage - 1],
    };
}
