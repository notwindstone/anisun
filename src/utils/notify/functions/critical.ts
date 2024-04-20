import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json'

export const critical = () => {
    notifications.clean()

    return notifications.show(notificationsData.critical)
}