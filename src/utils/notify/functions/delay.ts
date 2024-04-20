import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json'

export const delay = () => {
    notifications.clean()

    return notifications.show(notificationsData.delay)
}