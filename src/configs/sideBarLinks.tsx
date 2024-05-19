import {IconHome, IconSearch, IconSettings, IconTrendingUp, IconUserCircle} from "@tabler/icons-react";

const iconProps = {size: 32, stroke: 1.5}

export const sideBarLinks = [
    {
        label: 'Главная',
        icon: <IconHome {...iconProps} />,
        pathname: '/',
    },
    {
        label: 'Аккаунт',
        icon: <IconUserCircle {...iconProps} />,
        content: "account",
    },
    {
        label: 'Поиск',
        icon: <IconSearch {...iconProps} />,
        content: "search",
    },
    {
        label: 'Популярное',
        icon: <IconTrendingUp {...iconProps} />,
        pathname: '/trending',
    },
    {
        label: 'Настройки',
        icon: <IconSettings {...iconProps} />,
        content: "settings",
    }
]