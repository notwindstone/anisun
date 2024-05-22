import useRipple from "use-ripple-hook";
import {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";
import {usePathname, useRouter} from "next/navigation";
import NProgress from "nprogress";
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {Group, rem, Text, UnstyledButton} from "@mantine/core";
import classes from "@/components/SideBar/SideBarHome/SideBarHome.module.css";
import {IconTrendingUp} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import SideBarItemExpanded from "@/components/SideBar/SideBarItemExpanded/SideBarItemExpanded";

const LABEL = "Популярное"

export default function SideBarTrending() {
    const [ripple, event] = useRipple();
    const { opened } = useContext(
        SideBarContext
    );
    const router = useRouter();
    const pathname = usePathname();
    const redirectLink = '/trending'

    function redirectToTrending() {
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
                onClick={redirectToTrending}
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
                        <IconTrendingUp {...variables.iconProps} />
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