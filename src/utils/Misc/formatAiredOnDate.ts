import dayjs from "dayjs";
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

export function formatAiredOnDate(airedOnDate: string) {
    dayjs.locale('ru');
    dayjs.extend(relativeTime);

    return dayjs(airedOnDate).format('D MMM YYYY');
}