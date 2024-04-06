import dayjs from "dayjs";
import 'dayjs/locale/ru'

export function MakeDate(createdAt: string) {
    dayjs.locale('ru')
    const currentDay = dayjs(createdAt).format('dddd DD-MM-YYYY H:mm:ss')

    return (`${currentDay}`)
}