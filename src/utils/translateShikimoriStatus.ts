export default function translateShikimoriStatus(shikimoriStatus: string) {
    let status

    switch (shikimoriStatus) {
        case 'anons':
            status = 'Анонсировано'
            break
        case 'ongoing':
            status = 'В работе'
            break
        case 'released':
            status = 'Завершено'
            break
        default:
            status = 'Неизвестно'
            break
    }

    return status
}