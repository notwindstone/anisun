import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const done = (locale: string) => {
    notifications.clean();

    let message;

    switch (locale) {
        case "en":
            message = notificationsData.done.en;
            break;
        case "ru":
            message = notificationsData.done.ru;
            break;
        default:
            message = notificationsData.done.en;
            break;
    }

    return notifications.show(message);
};