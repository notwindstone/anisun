import useRipple from "use-ripple-hook";
import {useRouter} from "next/navigation";
import {UnstyledButton} from "@mantine/core";
import classes from './NavigationButton.module.css';
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import NProgress from "nprogress";

const RIPPLE_COLOR = {
    color: "var(--animeth-ripple-color)",
}
const ICON_STYLES = {
    size: 32,
    stroke: 1.5,
}

export default function NavigationButton({ type }: { type: "forward" | "back" }) {
    const router = useRouter()
    const [ripple, event] = useRipple(RIPPLE_COLOR);

    let icon

    switch (type) {
        case "back":
            icon = (
                <IconChevronLeft {...ICON_STYLES} />
            )
            break
        case "forward":
            icon = (
                <IconChevronRight {...ICON_STYLES} />
            )
            break
        default:
            icon = (
                <IconChevronLeft {...ICON_STYLES} />
            )
            break
    }

    function redirectUser() {
        NProgress.start()

        type === "back" ? router.back() : router.forward()

        NProgress.done()
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
    )
}