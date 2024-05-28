import dayjs from "dayjs";
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

export function formatNextEpisodeDate(nextEpisodeDate: string) {
    dayjs.locale('ru');
    dayjs.extend(relativeTime);

    return dayjs(nextEpisodeDate).format('D MMM HH:mm');
}