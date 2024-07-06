import {Box, Burger, Group, Image, rem, Transition} from "@mantine/core";
import {useContext} from "react";
import {SideBarContext} from "@/utils/Contexts/Contexts";
import classes from './SideBarBurger.module.css';
import NProgress from "nprogress";
import NextImage from "next/image";
import {useRouter} from "next/navigation";
import {variables} from "@/configs/variables";
import GradientTitle from "@/components/GradientTitle/GradientTitle";

export default function SideBarBurger() {
    const { opened, toggle } = useContext(
        SideBarContext
    );
    const router = useRouter();
    const title = opened ? 'Close navigation' : 'Open navigation';

    return (
        <Group
            align="center"
            gap={0}
            wrap="nowrap"
        >
            {/* Burger's size is 34x34, that's why Box has padding of 15px and not 16px */}
            <Box className={classes.burgerWrapper} p={rem(15)}>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    title={title}
                />
            </Box>
            <Transition
                mounted={opened}
                transition="fade-right"
                duration={150}
                timingFunction="ease"
            >
                {
                    (styles) => (
                        <Group
                            className={classes.headingGroup}
                            gap={rem(16)}
                            style={styles}
                            align="center"
                            wrap="nowrap"
                            onClick={() => {
                                NProgress.start();
                                router.push('/');
                                NProgress.done();
                            }}
                        >
                            <Image
                                alt="Anisun website icon"
                                src="/favicon.png"
                                radius="xl"
                                w={32}
                                h={32}
                                component={NextImage}
                                width={32}
                                height={32}
                                placeholder="blur"
                                blurDataURL={variables.imagePlaceholder}
                            />
                            <GradientTitle />
                        </Group>
                    )
                }
            </Transition>
        </Group>
    );
}