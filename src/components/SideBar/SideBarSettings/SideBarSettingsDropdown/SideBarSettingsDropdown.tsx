import {Anchor, Box, Group, Image, Popover, rem, SegmentedControl, Stack, Text, Transition} from "@mantine/core";
import classes from './SideBarSettingsDropdown.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import {useState} from "react";
import {variables} from "@/configs/variables";
import NextImage from "next/image";

const GENERAL = variables.settings.general
const ABOUT = variables.settings.about

export default function SideBarSettingsDropdown() {
    const { theme } = useCustomTheme()
    const [section, setSection] = useState<string>(GENERAL.value)

    let content

    switch (section) {
        case "about":
            content = (
                <Stack className={classes.stack} align="center">
                    <Image
                        alt="Animeth website icon"
                        src="/favicon.png"
                        radius="xl"
                        w={64}
                        h={64}
                        component={NextImage}
                        width={64}
                        height={64}
                        placeholder="blur"
                        blurDataURL={variables.imagePlaceholder}
                    />
                    <Text
                        inline
                        size={rem(32)}
                        fw={700}
                        variant="gradient"
                        gradient={{ from: 'violet', to: 'indigo', deg: 90 }}
                    >
                        ANIMETH
                    </Text>
                    <Group>
                        <Anchor
                            href="https://github.com/windstone-aristotle-yellow/animeth"
                            target="_blank"
                        >
                            GitHub
                        </Anchor>
                        <Anchor
                            href="https://t.me/windst1"
                            target="_blank"
                        >
                            Telegram
                        </Anchor>
                        <Anchor
                            href="https://github.com/windstone-aristotle-yellow/animeth/blob/main/LICENSE"
                            target="_blank"
                        >
                            License
                        </Anchor>
                    </Group>
                    <Text ta="center">
                        Сайт для просмотра аниме на основе Next.js и Mantine UI. Более подробная информация находится в репозитории на GitHub.
                    </Text>
                </Stack>
            )
            break
        case "general":
        default:
            content = (
                <></>
            )
            break
    }

    return (
        <Popover.Dropdown>
            <Group w={rem(400)} wrap="nowrap" p={rem(8)} align="flex-start" gap={rem(16)}>
                <SegmentedControl
                    orientation="vertical"
                    color={theme.color}
                    classNames={{
                        root: classes.root,
                    }}
                    withItemsBorders={false}
                    value={section}
                    onChange={setSection}
                    data={[
                        GENERAL,
                        ABOUT
                    ]}
                />
                {content}
            </Group>
        </Popover.Dropdown>
    )
}