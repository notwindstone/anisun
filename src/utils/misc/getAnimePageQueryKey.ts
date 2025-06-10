export default function getAnimePageQueryKey(idMal: number): Array<string | number> {
    return ["anime", "anilist", idMal];
}
