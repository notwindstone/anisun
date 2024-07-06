import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const critical = (locale: string) => {
    notifications.clean();

    let message;

    switch (locale) {
        case "en":
            message = notificationsData.critical.en;
            break;
        case "ru":
            message = notificationsData.critical.ru;
            break;
        default:
            message = notificationsData.critical.en;
            break;
    }

    return notifications.show(message);
};