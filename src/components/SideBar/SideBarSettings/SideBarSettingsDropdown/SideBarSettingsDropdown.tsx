import {
    Anchor,
    Button,
    Collapse,
    Flex,
    Group,
    Image, Popover,
    rem,
    SegmentedControl,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import classes from './SideBarSettingsDropdown.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import {useState} from "react";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import ThemeSchemeControl from "@/components/ThemeSchemeControl/ThemeSchemeControl";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import {useDisclosure} from "@mantine/hooks";
import ColorSchemePicker from "@/components/ColorSchemePicker/ColorSchemePicker";
import {IconChevronDown} from "@tabler/icons-react";
import GradientTitle from "@/components/GradientTitle/GradientTitle";

const GENERAL = variables.settings.general
const ABOUT = variables.settings.about
const LINKS = variables.websiteLinks

export default function SideBarSettingsDropdown() {
    const { theme } = useCustomTheme();
    const [section, setSection] = useState<string>(GENERAL.value);
    const [opened, { toggle }] = useDisclosure(false);

    const WEBSITE_COLOR = {
        label: "Элементы сайта",
        value: "website",
    };
    const NEXT_TOP_LOADER_COLOR = {
        label: "Индикатор загрузчика",
        value: "topLoader",
    };

    const [themingOption, setThemingOption] = useState(WEBSITE_COLOR.value);
    const isTopLoaderSection = themingOption === "topLoader";
    const currentColor = isTopLoaderSection ? theme.topLoaderColor : theme.color;

    let content;

    switch (section) {
        case "about":
            content = (
                <Stack align="center">
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
                    <GradientTitle />
                    <Group>
                        {
                            LINKS.map((link) => {
                                return (
                                    <Anchor
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        c={theme.color}
                                    >
                                        {link.label}
                                    </Anchor>
                                )
                            })
                        }
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
                <Stack>
                    <Title c="var(--animeth-text-contrast-color)">
                        Тема
                    </Title>
                    <SegmentedControl
                        autoContrast
                        color={currentColor}
                        classNames={{
                            root: classes.root,
                        }}
                        withItemsBorders={false}
                        value={themingOption}
                        onChange={setThemingOption}
                        data={[
                            WEBSITE_COLOR,
                            NEXT_TOP_LOADER_COLOR
                        ]}
                    />
                    <Flex gap={rem(8)} wrap="wrap">
                        <ColorSchemeControl option={themingOption} />
                        <ThemeSchemeControl color={currentColor} />
                    </Flex>
                    <Button 
                        variant="light" 
                        color={currentColor}
                        onClick={toggle}
                        rightSection={
                            <IconChevronDown
                                className={`
                                    ${classes.chevron} 
                                    ${opened && classes.chevronRotated}
                                `}
                                size={20}
                            />
                        }
                    >
                        Выбрать свой цвет
                    </Button>
                    <Collapse in={opened}>
                        <ColorSchemePicker option={themingOption} />
                    </Collapse>
                </Stack>
            )
            break
    }

    return (
        <Popover.Dropdown>
            <Group
                w={rem(428)}
                wrap="nowrap"
                p={rem(8)}
                align="flex-start"
                gap={rem(16)}
            >
                <SegmentedControl
                    autoContrast
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