import dayjs from "dayjs";
import 'dayjs/locale/ru'

export function MakeDate(createdAt: string) {
    dayjs.locale('ru')

    let isPreviousYear = dayjs(createdAt).isBefore(dayjs(), 'year')

    const currentDay = dayjs().format('D MMMM YYYY в H:mm')

    return (`${currentDay}, ${isPreviousYear}`)
}