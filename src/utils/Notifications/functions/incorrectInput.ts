import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const incorrectInput = () => {
    notifications.clean();

    return notifications.show(notificationsData.incorrectInput);
};