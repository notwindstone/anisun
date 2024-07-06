import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const notAuthenticated = (locale: string) => {
    notifications.clean();

    let message;

    switch (locale) {
        case "en":
            message = notificationsData.notAuthenticated.en;
            break;
        case "ru":
            message = notificationsData.notAuthenticated.ru;
            break;
        default:
            message = notificationsData.notAuthenticated.en;
            break;
    }

    return notifications.show(message);
};