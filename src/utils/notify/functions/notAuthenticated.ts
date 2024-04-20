import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json'

export const notAuthenticated = () => {
    notifications.clean()

    return notifications.show(notificationsData.notAuthenticated)
}