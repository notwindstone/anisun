import {Tooltip, UnstyledButton} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {
    IconHome,
    IconHomeFilled,
    IconSearch,
    IconTrendingUp,
} from "@tabler/icons-react";
import {useState} from "react";

const navLinks = [
    {
        label: 'Главная',
        icon: <IconHome size={32} stroke={1.5} />,
        activeIcon: <IconHomeFilled size={32} stroke={3} />,
    },
    {
        label: 'Поиск',
        icon: <IconSearch size={32} stroke={1.5} />,
        activeIcon: <IconSearch size={32} stroke={3} />,
    },
    {
        label: 'Популярное',
        icon: <IconTrendingUp size={32} stroke={1.5} />,
        activeIcon: <IconTrendingUp size={32} stroke={3} />,
    }
]

export default function SideBarButton() {
    const [active, setActive] = useState(0)
    const navButtons = navLinks.map((link, index) => {
        const isActive = active === index

        return (
            <Tooltip
                key={link.label}
                color="gray"
                withArrow
                position="right"
                label={link.label}
                transitionProps={{ transition: 'fade-right' }}
            >
                <UnstyledButton
                    className={
                        `${classes.button} ${isActive && classes.activeButton}`
                    }
                    onClick={() => setActive(index)}
                >
                    {
                        isActive
                            ? link.activeIcon
                            : link.icon
                    }
                </UnstyledButton>
            </Tooltip>
        )
    })

    return (
        <>
            {navButtons}
        </>
    )
}