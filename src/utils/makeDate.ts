import dayjs from "dayjs";
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

export function makeDate(createdAt: string) {
    dayjs.locale('ru')
    dayjs.extend(relativeTime)

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
    const isSameHour = dayjs(createdAt).isSame(dayjs(), 'hour')

    if (isSameHour) {
        return dayjs(createdAt).fromNow()
    }

    if (isToday) {
        return dayjs(createdAt).format('Сегодня в H:mm')
    }

    // В любой другой день, если не прошлый год, не вчера и не сегодня
    return dayjs(createdAt).format('D MMMM в H:mm')
}