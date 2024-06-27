import {useDisclosure, useMove} from "@mantine/hooks";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import {
    Anchor, Button,
    Center, Collapse,
    Flex,
    Group,
    Image, NativeSelect,
    rem,
    SegmentedControl, Space,
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
import MobileNavbarMenuAccount
    from "@/components/MobileNavbar/MobileNavbarMenu/MobileNavbarMenuAccount/MobileNavbarMenuAccount";
import localesData from "@/configs/localesData.json";
import NProgress from "nprogress";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

const GENERAL = variables.settings.general;
const ABOUT = variables.settings.about;
const ACCOUNT = variables.settings.account;
const LANGUAGE = variables.settings.language;
const LINKS = variables.websiteLinks;

export default function MobileNavbarMenu() {
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');
    const router = useRouter();
    const { theme } = useCustomTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const [colorPickerExpanded, { toggle: togglePicker }] = useDisclosure(false);
    const [section, setSection] = useState<string>(GENERAL.value);
    const { ref, active } = useMove(() => {});

    const WEBSITE_COLOR = {
        label: translate('common__theme-website-elements-label'),
        value: "website",
    };
    const NEXT_TOP_LOADER_COLOR = {
        label: translate('common__theme-loader-label'),
        value: "topLoader",
    };

    const translatedData = [
        GENERAL,
        LANGUAGE,
        ABOUT,
        ACCOUNT
    ].map((data) => {
        return {
            label: translate(data.label),
            value: data.value,
        };
    });

    const [themingOption, setThemingOption] = useState(WEBSITE_COLOR.value);
    const isTopLoaderSection = themingOption === "topLoader";
    const currentColor = isTopLoaderSection ? theme.topLoaderColor : theme.color;

    let content;

    function changeLanguage(value: string | null) {
        if (!value) {
            NProgress.start();
            router.refresh();
            NProgress.done();
            return;
        }

        NProgress.start();
        router.push(`/${value}`);

        if (value === locale) {
            NProgress.done();
        }
    }

    switch (section) {
        case "language":
            content = (
                <Stack className={classes.stack}>
                    <Title c="var(--animeth-text-contrast-color)">
                        {translate('common__language-label')}
                    </Title>
                    <NativeSelect
                        classNames={{
                            input: classes.select,
                        }}
                        data={localesData}
                        value={locale}
                        onChange={(event) => changeLanguage(event.currentTarget.value)}
                    />
                </Stack>
            );
            break;
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
                        {translate('common__website-description-text')}
                    </Text>
                </Stack>
            );
            break;
        case "general":
            content = (
                <Stack>
                    <Title c="var(--animeth-text-contrast-color)">
                        {translate('common__theme-label')}
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
                        {translate('common__select-color-label')}
                    </Button>
                    <Collapse in={colorPickerExpanded}>
                        <ColorSchemePicker customRef={ref} option={themingOption} />
                    </Collapse>
                </Stack>
            );
            break;
        case "account":
            content = (
                <MobileNavbarMenuAccount close={close} />
            );
            break;
    }

    return (
        <>
            <Sheet
                isOpen={opened}
                onClose={close}
                disableDrag={active}
                detent="content-height"
            >
                <Sheet.Container>
                    <Sheet.Header className={classes.drawerHeader} />
                    <Sheet.Content className={classes.drawerBody}>
                        <Sheet.Scroller>
                            <Stack pb={rem(16)} align="center" gap={rem(8)}>
                                <SegmentedControl
                                    pb={rem(16)}
                                    autoContrast
                                    color={theme.color}
                                    classNames={{
                                        root: classes.segmentedControlRoot,
                                    }}
                                    withItemsBorders={false}
                                    value={section}
                                    onChange={setSection}
                                    data={translatedData}
                                />
                                {content}
                                <Space my="xs" />
                            </Stack>
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={close} />
            </Sheet>
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon className={classes.button}>
                        <IconMenu2 className={classes.icon} stroke={1.5} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>
                        {translate('common__menu-label')}
                    </Text>
                </UnstyledButton>
            </Center>
        </>
    );
}