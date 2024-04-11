import {notifications} from "@mantine/notifications";

export const delay = async () => {
    notifications.clean()

    return notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, подождите',
        autoClose: 3000,
        color: 'yellow'
    })
}