import {Tooltip, UnstyledButton} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {IconHome, IconHomeFilled} from "@tabler/icons-react";

export default function SideBarButton() {
    return (
        <>
            <Tooltip
                color="gray"
                withArrow
                position="right"
                label="Главная"
                transitionProps={{ transition: 'fade-right' }}
            >
                <UnstyledButton className={classes.button}>
                    <IconHome size={32} stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
        </>
    )
}