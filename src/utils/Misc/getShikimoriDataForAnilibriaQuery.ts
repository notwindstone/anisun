import {client} from "@/lib/shikimori/client";

export default async function getShikimoriDataForAnilibriaQuery({ id }: { id: string }) {
    const shikimori = client();
    const shikimoriAnime = (await shikimori.animes.byId({
        ids: id,
        filter: [
            "name",
            "english",
            "russian",
            "airedOn { year month day date }",
            "duration"
        ],
    })).animes[0];

    const shikimoriOriginalName = shikimoriAnime.name;
    const shikimoriEnglishName = shikimoriAnime.english;
    const shikimoriRussianName = shikimoriAnime.russian;
    const shikimoriYear = shikimoriAnime.airedOn?.year;
    const shikimoriDuration = shikimoriAnime.duration ?? 1;
    const approximateDuration = `(${shikimoriDuration - 1}, ${shikimoriDuration}, ${shikimoriDuration + 1})`;

    return {
        shikimoriOriginalName,
        shikimoriEnglishName,
        shikimoriRussianName,
        shikimoriYear,
        approximateDuration,
    };
}