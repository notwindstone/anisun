import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import {
    Anchor, Button,
    Center, Collapse,
    Flex,
    Group,
    Image,
    rem,
    SegmentedControl,
    Stack,
    Text,
    ThemeIcon,
    Title,
    UnstyledButton
} from "@mantine/core";
import {IconChevronDown, IconMenu2} from "@tabler/icons-react";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import ColorSchemePicker from "@/components/ColorSchemePicker/ColorSchemePicker";
import {variables} from "@/configs/variables";
import {useState} from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import NextImage from "next/image";
import GradientTitle from "@/components/GradientTitle/GradientTitle";
import ThemeSchemeControl from "@/components/ThemeSchemeControl/ThemeSchemeControl";
import {Sheet} from "react-modal-sheet";

const GENERAL = variables.settings.general;
const ABOUT = variables.settings.about;
const ACCOUNT = variables.settings.account;
const LINKS = variables.websiteLinks;

export default function MobileNavbarMenu() {
    const { theme } = useCustomTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const [colorPickerExpanded, { toggle: togglePicker }] = useDisclosure(false);
    const [section, setSection] = useState<string>(GENERAL.value);

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
                                );
                            })
                        }
                    </Group>
                    <Text ta="center">
                        Сайт для просмотра аниме на основе Next.js и Mantine UI. Более подробная информация находится в репозитории на GitHub.
                    </Text>
                </Stack>
            );
            break;
        case "general":
            content = (
                <Stack>
                    <Title c="var(--animeth-text-contrast-color)">
                        Тема
                    </Title>
                    <div>
                        <SegmentedControl
                            autoContrast
                            color={currentColor}
                            classNames={{
                                root: classes.segmentedControlRoot,
                            }}
                            withItemsBorders={false}
                            value={themingOption}
                            onChange={setThemingOption}
                            data={[
                                WEBSITE_COLOR,
                                NEXT_TOP_LOADER_COLOR
                            ]}
                        />
                    </div>
                    <Flex gap={rem(8)} wrap="wrap">
                        <ColorSchemeControl option={themingOption} />
                        <ThemeSchemeControl color={currentColor} />
                    </Flex>
                    <Button
                        variant="light"
                        color={currentColor}
                        onClick={togglePicker}
                        rightSection={
                            <IconChevronDown
                                className={`
                                    ${classes.chevron} 
                                    ${colorPickerExpanded && classes.chevronRotated}
                                `}
                                size={20}
                            />
                        }
                    >
                        Выбрать свой цвет
                    </Button>
                    <Collapse in={colorPickerExpanded}>
                        <ColorSchemePicker option={themingOption} />
                    </Collapse>
                </Stack>
            );
            break;
        case "account":
            content = (
                <></>
            );
            break;
    }

    return (
        <>
            <Sheet
                isOpen={opened}
                onClose={close}
            >
                <Sheet.Container>
                    <Sheet.Header className={classes.drawerHeader} />
                    <Sheet.Content className={classes.drawerBody}>
                        <Stack align="center" gap={rem(8)}>
                            <SegmentedControl
                                autoContrast
                                color={theme.color}
                                classNames={{
                                    root: classes.segmentedControlRoot,
                                }}
                                withItemsBorders={false}
                                value={section}
                                onChange={setSection}
                                data={[
                                    GENERAL,
                                    ABOUT,
                                    ACCOUNT
                                ]}
                            />
                            {content}
                        </Stack>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon className={classes.button}>
                        <IconMenu2 className={classes.icon} stroke={1.5} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Меню</Text>
                </UnstyledButton>
            </Center>
        </>
    );
}