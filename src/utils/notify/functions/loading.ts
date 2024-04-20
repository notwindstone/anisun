import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json'

export const loading = (id: string, isLoading: boolean) => {
    if (isLoading) {
        return notifications.show({ id: id, loading: isLoading, ...notificationsData.loading })
    }

    return notifications.update({ id: id, loading: isLoading, ...notificationsData.done })
}