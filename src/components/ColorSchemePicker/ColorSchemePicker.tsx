"use client";

import {ColorInput, ColorPicker, Group, Stack} from "@mantine/core";
import {RefObject, useEffect, useState} from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import classes from './ColorSchemePicker.module.css';
import NProgress from "nprogress";
import {useDisclosure} from "@mantine/hooks";
import {useTranslations} from "next-intl";

export default function ColorSchemePicker({ option, customRef }: { option: string, customRef?: RefObject<HTMLDivElement> }) {
    const translate = useTranslations('Translations');
    const { theme, setTheme } = useCustomTheme();
    const [color, onChange] = useState('#000000');
    const isTopLoader = option === "topLoader";
    const currentThemeColor = isTopLoader ? theme.topLoaderColor : theme.color;
    const [activated, { toggle }] = useDisclosure();

    function updateColor() {
        if (isTopLoader) {
            return setTheme({...theme, topLoaderColor: color});
        }

        return setTheme({ ...theme, color: color });
    }

    function showTopLoader() {
        toggle();

        if (activated) {
            return NProgress.done();
        }

        return NProgress.start();
    }

    useEffect(() => {
        return onChange(
            // @ts-ignore
            isTopLoader ? theme.topLoaderColor : theme.color
        );
    }, [isTopLoader, option, theme.color, theme.topLoaderColor]);

    return (
        <>
            <Stack className={classes.stack}>
                <div ref={customRef}>
                    <ColorPicker
                        classNames={{
                            wrapper: classes.wrapper
                        }}
                        value={color}
                        onChange={onChange}
                    />
                </div>
                <ColorInput
                    classNames={{
                        input: classes.input
                    }}
                    value={color}
                    onChange={onChange}
                    withPicker={false}
                    variant="default"
                    placeholder={translate('component__color-scheme-picker__enter-color-label')}
                />
                <Group grow wrap="nowrap" justify="space-between">
                    {
                        isTopLoader && (
                            <DecoratedButton
                                className={classes.loaderButton}
                                variant="light"
                                onClick={showTopLoader}
                                color={currentThemeColor}
                            >
                                {
                                    activated
                                        ? translate('component__color-scheme-picker__hide-loader-label')
                                        : translate('component__color-scheme-picker__show-loader-label')
                                }
                            </DecoratedButton>
                        )
                    }
                    <DecoratedButton
                        className={classes.updateButton}
                        color={currentThemeColor}
                        variant="light"
                        onClick={updateColor}
                    >
                        {translate('common__update-label')}
                    </DecoratedButton>
                </Group>
            </Stack>
        </>
    );
}