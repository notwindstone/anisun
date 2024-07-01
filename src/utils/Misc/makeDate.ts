import dayjs from "dayjs";
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

export function makeDate({ createdAt, locale }: { createdAt: string, locale: string }) {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
console.log(dayjs('2024-07-01T10:32:18.592Z').format(`D MMMM H:mm`))
    let preposition, wordYesterday, wordToday;

    switch (locale) {
        case "en":
            preposition = ', ';
            wordYesterday = 'Yesterday';
            wordToday = 'Today';
            break;
        case "ru":
            preposition = ' в ';
            wordYesterday = 'Вчера';
            wordToday = 'Сегодня';
            break;
        default:
            preposition = ', ';
            wordYesterday = 'Yesterday';
            wordToday = 'Today';
            break;
    }

    const isPreviousYear = dayjs(createdAt).isBefore(dayjs(), 'year');

    if (isPreviousYear) {
        return dayjs(createdAt).format(`D MMMM YYYY${preposition}H:mm`);
    }

    const yesterday = dayjs().subtract(1, 'day');
    const isYesterday = dayjs(createdAt).isSame(yesterday, 'day');

    if (isYesterday) {
        const formattedDate = dayjs(createdAt).format('H:mm');

        return `${wordYesterday}${preposition}${formattedDate}`;
    }

    const isToday = dayjs(createdAt).isSame(dayjs(), 'day');
    const isSameHour = dayjs(createdAt).isSame(dayjs(), 'hour');

    if (isToday) {
        if (isSameHour) {
            return dayjs(createdAt).fromNow();
        }

        const formattedDate = dayjs(createdAt).format('H:mm');

        return `${wordToday}${preposition}${formattedDate}`;
    }

    // В любой другой день, если не прошлый год, не вчера и не сегодня
    return dayjs(createdAt).format(`D MMMM${preposition}H:mm`);
}