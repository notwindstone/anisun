import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const delay = (locale: string) => {
    notifications.clean();

    let message;

    switch (locale) {
        case "en":
            message = notificationsData.delay.en;
            break;
        case "ru":
            message = notificationsData.delay.ru;
            break;
        default:
            message = notificationsData.delay.en;
            break;
    }

    return notifications.show(message);
};