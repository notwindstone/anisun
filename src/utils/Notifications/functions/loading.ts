import {notifications} from "@mantine/notifications";
import notificationsData from '../../../configs/notificationsData.json';

export const loading = (id: string, isLoading: boolean, locale: string) => {
    let loadingMessage;
    let doneMessage;

    switch (locale) {
        case "en":
            loadingMessage = notificationsData.loading.en;
            doneMessage = notificationsData.done.en;
            break;
        case "ru":
            loadingMessage = notificationsData.loading.ru;
            doneMessage = notificationsData.done.ru;
            break;
        default:
            loadingMessage = notificationsData.loading.en;
            doneMessage = notificationsData.done.en;
            break;
    }

    if (isLoading) {
        return notifications.show({ id: id, loading: isLoading, ...loadingMessage });
    }

    return notifications.update({ id: id, loading: isLoading, ...doneMessage });
};