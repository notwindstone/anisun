export default function translateShikimoriKind(shikimoriKind: string) {
    let kind

    switch (shikimoriKind) {
        case 'tv':
            kind = 'Сериал'
            break
        case 'movie':
            kind = 'Фильм'
            break
        case 'ova':
            kind = 'OVA'
            break
        case 'ona':
            kind = 'ONA'
            break
        case 'special':
            kind = 'Спецвыпуск'
            break
        case 'tv_special':
            kind = 'TV Спецвыпуск'
            break
        case 'music':
            kind = 'Клип'
            break
        case 'pv':
            kind = 'Проморолик'
            break
        case 'cm':
            kind = 'Реклама'
            break
        default:
            kind = 'Неизвестно'
            break
    }

    return kind
}