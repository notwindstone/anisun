import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const done = () => {
    notifications.clean();

    return notifications.show(notificationsData.done);
};