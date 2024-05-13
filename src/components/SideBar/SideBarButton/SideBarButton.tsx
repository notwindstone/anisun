import {
    Avatar, Button,
    Center, Flex,
    Group,
    Popover,
    rem,
    Stack,
    Text,
    Title,
    Tooltip,
    Transition,
    UnstyledButton
} from "@mantine/core";
import classes from './SideBarButton.module.css';
import {SideBarLink} from "@/types/SideBarLink";
import {useContext, useEffect, useState} from "react";
import {SideBarLinkContext} from "@/components/SideBar/SideBar";
import {
    IconChevronRight,
    IconCloudLockOpen,
    IconLogin,
    IconLogout,
    IconSettings,
    IconUserCircle
} from "@tabler/icons-react";
import useRipple from "use-ripple-hook";
import {SignedIn, SignedOut, SignIn, SignOutButton, SignUp, UserProfile, useUser} from "@clerk/nextjs";
import NProgress from "nprogress";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {useDisclosure} from "@mantine/hooks";
import SettingsButton from "@/components/SideBar/SettingsButton/SettingsButton";
import AccountButton from "@/components/SideBar/AccountButton/AccountButton";

const rippleColor = {
    color: "var(--animeth-ripple-color)",
}

export default function SideBarButton({ link }: { link: SideBarLink }) {
    const { user } = useUser();
    const [rippleFirst, eventFirst] = useRipple(rippleColor);
    const [rippleSecond, eventSecond] = useRipple(rippleColor);
    const [rippleThird, eventThird] = useRipple(rippleColor);
    const [rippleFourth, eventFourth] = useRipple(rippleColor);
    const { opened } = useContext(SideBarLinkContext)
    const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
    const [signInOpened, { open: openSignIn, close: closeSignIn }] = useDisclosure(false);
    const [signUpOpened, { open: openSignUp, close: closeSignUp }] = useDisclosure(false);
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isActive = link.pathname === pathname
    const isPopover = link.content !== undefined

    useEffect(() => {
        router.push(pathname)

        if (!user) {
            return
        }

        closeSignUp()
        closeSignIn()
        NProgress.start()
        NProgress.done()
    }, [user]);

    let content

    switch (link.content) {
        case "account":
            return <AccountButton link={link} />
        case "search":
            content = (
                <>

                </>
            )
            break
        case "settings":
            content = (
                <SettingsButton />
            )
            break
        default:
            content = null
            break
    }

    const button = (
        <UnstyledButton
            ref={rippleFourth}
            onPointerDown={eventFourth}
            className={
                `
                    ${classes.button} 
                    ${isActive && classes.activeButton}
                    ${opened && classes.expandedButton}
                `
            }
            onClick={() => {
                setExpanded(!expanded)

                if (link.pathname !== undefined) {
                    NProgress.start()
                    router.push(link.pathname)
                }

                if (link.pathname === pathname) {
                    return NProgress.done()
                }
            }}
        >
            <Center className={classes.iconWrapper} w={64} h={64}>
                {
                    isActive
                        ? link.activeIcon
                        : link.icon
                }
            </Center>
            <Transition
                mounted={opened}
                transition="fade-right"
                duration={150}
                timingFunction="ease"
            >
                {
                    (styles) =>
                        <Group pr={rem(16)} wrap="nowrap" w="100%" justify="space-between" align="center">
                            <Text fw={500} size="lg" style={styles}>
                                {link.label}
                            </Text>
                            {
                                isPopover && (
                                    <IconChevronRight
                                        className={
                                            `${classes.chevron} ${expanded && classes.chevronRotated}`
                                        }
                                        size={24}
                                        stroke={1.5}
                                        style={styles}
                                    />
                                )
                            }
                        </Group>
                }
            </Transition>
        </UnstyledButton>
    )

    return isPopover ? (
        <>
            <Transition
                mounted={settingsOpened}
                transition="fade-down"
                duration={400}
                timingFunction="ease"
            >
                {
                    (styles) => (
                        <Flex style={styles} gap={rem(32)} align="center" direction="column" className={classes.modal}>
                            <Button style={styles} className={classes.closeButton} onClick={closeSettings}>Закрыть</Button>
                            <UserProfile />
                        </Flex>
                    )
                }
            </Transition>
            <Transition
                mounted={signInOpened}
                transition="fade-down"
                duration={400}
                timingFunction="ease"
            >
                {
                    (styles) => (
                        <Flex style={styles} gap={rem(32)} align="center" direction="column" className={classes.modal}>
                            <Button style={styles} className={classes.closeButton} onClick={closeSignIn}>Закрыть</Button>
                            <SignIn routing="virtual" />
                        </Flex>
                    )
                }
            </Transition>
            <Transition
                mounted={signUpOpened}
                transition="fade-down"
                duration={400}
                timingFunction="ease"
            >
                {
                    (styles) => (
                        <Flex style={styles} gap={rem(32)} align="center" direction="column" className={classes.modal}>
                            <Button style={styles} className={classes.closeButton} onClick={closeSignUp}>Закрыть</Button>
                            <SignUp routing="virtual" />
                        </Flex>
                    )
                }
            </Transition>
            <Popover
                classNames={{
                    dropdown: classes.dropdown,
                }}
                opened={expanded}
                onChange={setExpanded}
                position="right"
                transitionProps={{ transition: 'fade-right', duration: 150 }}
            >
                <Popover.Target>
                    {button}
                </Popover.Target>
                <Popover.Dropdown>
                    {content}
                </Popover.Dropdown>
            </Popover>
        </>
    ) : (
        <>
            <Tooltip
                color="gray"
                position="right"
                label={link.label}
                transitionProps={{ transition: 'fade-right' }}
            >
                {button}
            </Tooltip>
        </>
    )
}