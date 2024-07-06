export default function translateRouteNames({ path, locale }: { path: string, locale: string }) {
    let translatedPath;

    let animesPath, accountPath, trendingPath;

    switch (locale) {
        case "en":
            animesPath = 'Anime';
            accountPath = 'Account';
            trendingPath = 'Trending';
            break;
        case "ru":
            animesPath = 'Аниме';
            accountPath = 'Аккаунт';
            trendingPath = 'Популярное';
            break;
        default:
            animesPath = 'Anime';
            accountPath = 'Account';
            trendingPath = 'Trending';
            break;
    }

    switch (path) {
        case "titles":
            translatedPath = animesPath;
            break;
        case "account":
            translatedPath = accountPath;
            break;
        case "trending":
            translatedPath = trendingPath;
            break;
        default:
            translatedPath = path;
            break;
    }

    return translatedPath;
}