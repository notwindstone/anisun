export default function translateRouteNames(path: string) {
    let translatedPath

    switch (path) {
        case "titles":
            translatedPath = 'Аниме'
            break
        case "account":
            translatedPath = 'Аккаунт'
            break
        case "trending":
            translatedPath = 'Популярное'
            break
        case 'about':
            translatedPath = 'О сайте'
            break
        default:
            translatedPath = path
            break
    }

    return translatedPath
}