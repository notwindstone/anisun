import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import classes from "./SideBarHome.module.css";
import {Group, rem, Text, UnstyledButton} from "@mantine/core";
import {IconChevronRight, IconHome, IconSettings} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import SideBarItemExpanded from "@/components/SideBar/SideBarItemExpanded/SideBarItemExpanded";
import useRipple from "use-ripple-hook";
import {useDisclosure} from "@mantine/hooks";
import {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";
import {usePathname, useRouter} from "next/navigation";
import NProgress from "nprogress";

const LABEL = "Главная"

export default function SideBarHome() {
    const [ripple, event] = useRipple();
    const { opened } = useContext(
        SideBarContext
    );
    const router = useRouter();
    const pathname = usePathname();
    const redirectLink = '/'

    function redirectToHome() {
        if (redirectLink !== undefined) {
            NProgress.start()
            router.push(redirectLink)
        }

        if (pathname === redirectLink) {
            return NProgress.done()
        }
    }

    return (
        <SideBarButton
            label={LABEL}
        >
            <UnstyledButton
                ref={ripple}
                onPointerDown={event}
                className={`
                    ${classes.button}
                    ${pathname === redirectLink && classes.activeButton}
                `}
                w={opened ? rem(288) : rem(64)}
                h={rem(64)}
                p={rem(8)}
                onClick={redirectToHome}
            >
                <Group wrap="nowrap">
                    <Group
                        className={classes.iconWrapper}
                        wrap="nowrap"
                        w={rem(48)}
                        h={rem(48)}
                        justify="center"
                        align="center"
                    >
                        <IconHome {...variables.iconProps} />
                    </Group>
                    <SideBarItemExpanded mounted={opened}>
                        <Text size="lg" inline>
                            {LABEL}
                        </Text>
                    </SideBarItemExpanded>
                </Group>
            </UnstyledButton>
        </SideBarButton>
    )
}