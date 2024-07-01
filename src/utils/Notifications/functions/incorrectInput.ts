import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const incorrectInput = (locale: string) => {
    notifications.clean();

    let message;

    switch (locale) {
        case "en":
            message = notificationsData.incorrectInput.en;
            break;
        case "ru":
            message = notificationsData.incorrectInput.ru;
            break;
        default:
            message = notificationsData.incorrectInput.en;
            break;
    }

    return notifications.show(message);
};