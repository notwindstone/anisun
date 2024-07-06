import dayjs from "dayjs";
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

export function formatAiredOnDate({ airedOnDate, locale }: { airedOnDate: string, locale: string }) {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);

    return dayjs(airedOnDate).format('D MMM YYYY');
}