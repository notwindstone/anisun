import useRipple from "use-ripple-hook";
import {useRouter} from "next/navigation";
import {UnstyledButton} from "@mantine/core";
import classes from './NavigationButton.module.css';
import {IconChevronLeft, IconChevronRight, IconReload} from "@tabler/icons-react";
import NProgress from "nprogress";
import {variables} from "@/configs/variables";

const ICON_STYLES = {
    size: 32,
    stroke: 1.5,
};
const REFRESH_ICON_STYLES = {
    size: 24,
    stroke: 1.5,
};

export default function NavigationButton({ type }: { type: "forward" | "back" | "refresh" }) {
    const router = useRouter();
    const [ripple, event] = useRipple(variables.rippleColor);

    let icon;

    switch (type) {
        case "back":
            icon = (
                <IconChevronLeft {...ICON_STYLES} />
            );
            break;
        case "forward":
            icon = (
                <IconChevronRight {...ICON_STYLES} />
            );
            break;
        case "refresh":
            icon = (
                <IconReload {...REFRESH_ICON_STYLES} />
            );
            break;
        default:
            icon = (
                <IconChevronLeft {...ICON_STYLES} />
            );
            break;
    }

    function redirectUser() {
        NProgress.start();

        type === "back"
            ? router.back()
            : type === "forward"
                ? router.forward()
                : router.refresh();

        NProgress.done();
    }

    return (
        <UnstyledButton
            className={classes.button}
            ref={ripple}
            onPointerDown={event}
            onClick={redirectUser}
        >
            {icon}
        </UnstyledButton>
    );
}