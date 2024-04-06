import dayjs from "dayjs";
import 'dayjs/locale/ru'

export function makeDate(createdAt: string) {
    dayjs.locale('ru')

    const isPreviousYear = dayjs(createdAt).isBefore(dayjs(), 'year')

    if (isPreviousYear) {
        return dayjs(createdAt).format('D MMMM YYYY в H:mm')
    }

    const yesterday = dayjs().subtract(1, 'day')
    const isYesterday = dayjs(createdAt).isSame(yesterday, 'day')

    if (isYesterday) {
        return dayjs(createdAt).format('Вчера в H:mm')
    }

    const isToday = dayjs(createdAt).isSame(dayjs(), 'day')

    if (isToday) {
        return dayjs(createdAt).format('Сегодня в H:mm')
    }

    return dayjs(createdAt).format('D MMMM в H:mm')
}