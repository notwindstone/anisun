"use client";

import {ColorInput, ColorPicker, Group, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import classes from './ColorSchemePicker.module.css';
import NProgress from "nprogress";
import {useDisclosure} from "@mantine/hooks";

export default function ColorSchemePicker({ option }: { option: string }) {
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
                <ColorPicker
                    classNames={{
                        wrapper: classes.wrapper
                    }}
                    value={color}
                    onChange={onChange}
                />
                <ColorInput
                    value={color}
                    onChange={onChange}
                    withPicker={false}
                    variant="default"
                    placeholder="Введите цвет"
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
                                        ? "Скрыть загрузчик"
                                        : "Показать загрузчик"
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
                        Обновить
                    </DecoratedButton>
                </Group>
            </Stack>
        </>
    );
}