import {
    Anchor,
    Button,
    Collapse,
    Flex,
    Group,
    Image, Popover,
    rem,
    SegmentedControl, Select,
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
import localesData from '@/configs/localesData.json';
import {useTranslations} from "next-intl";
import NProgress from "nprogress";
import {useRouter} from "next/navigation";

const GENERAL = variables.settings.general;
const ABOUT = variables.settings.about;
const LANGUAGE = variables.settings.language;
const LINKS = variables.websiteLinks;

export default function SideBarSettingsDropdown() {
    const { theme } = useCustomTheme();
    const [section, setSection] = useState<string>(GENERAL.value);
    const [opened, { toggle }] = useDisclosure(false);
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');
    const router = useRouter();

    const translatedData = [GENERAL, LANGUAGE, ABOUT].map((data) => {
        return {
            label: translate(data.label),
            value: data.value,
        };
    });

    const WEBSITE_COLOR = {
        label: translate('component__mobile-navbar-menu__theme-website-elements-label'),
        value: "website",
    };
    const NEXT_TOP_LOADER_COLOR = {
        label: translate('component__mobile-navbar-menu__theme-loader-label'),
        value: "topLoader",
    };

    const [themingOption, setThemingOption] = useState(WEBSITE_COLOR.value);
    const isTopLoaderSection = themingOption === "topLoader";
    const currentColor = isTopLoaderSection ? theme.topLoaderColor : theme.color;

    let content;

    switch (section) {
        case "language":
            content = (
                <Stack className={classes.stack}>
                    <Title c="var(--animeth-text-contrast-color)">
                        {translate('common__language-label')}
                    </Title>
                    <Select
                        classNames={{
                            input: classes.select,
                            dropdown: classes.dropdown,
                            options: classes.options,
                            option: classes.option,
                        }}
                        data={localesData}
                        value={locale}
                        onChange={(value) => {
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
                        }}
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
        default:
            content = (
                <Stack>
                    <Title c="var(--animeth-text-contrast-color)">
                        {translate('common__theme-label')}
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
                        {translate('common__menu-label')}
                    </Button>
                    <Collapse in={opened}>
                        <ColorSchemePicker option={themingOption} />
                    </Collapse>
                </Stack>
            );
            break;
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
                    data={translatedData}
                />
                {content}
            </Group>
        </Popover.Dropdown>
    );
}