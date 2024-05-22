"use client";

import {ColorInput, ColorPicker, Group, Stack} from "@mantine/core";
import {useEffect, useState} from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import classes from './ColorSchemePicker.module.css';
import NProgress from "nprogress";

export default function ColorSchemePicker({ option }: { option: string }) {
    const { theme, setTheme } = useCustomTheme();
    const [color, onChange] = useState('#000000');
    const isTopLoader = option === "topLoader"
    const currentThemeColor = isTopLoader ? theme.topLoaderColor : theme.color

    function updateColor() {
        if (isTopLoader) {
            setTheme({ ...theme, topLoaderColor: color })
        }
        else {
            setTheme({ ...theme, color: color })
        }
    }

    function showTopLoader() {
        NProgress.start()
        setTimeout(() => {
            NProgress.done()
        }, 1000)
    }

    useEffect(() => {
        return onChange(
            // @ts-ignore
            isTopLoader ? theme.topLoaderColor : theme.color
        );
    }, [option]);

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
                <Group wrap="nowrap" justify="space-between">
                    <DecoratedButton
                        {...{ fullWidth: !isTopLoader }}
                        color={currentThemeColor}
                        variant="light"
                        onClick={updateColor}
                    >
                        Обновить
                    </DecoratedButton>
                    {
                        isTopLoader && (
                            <DecoratedButton
                                variant="light"
                                onClick={showTopLoader}
                                color={currentThemeColor}
                            >
                                Показать загрузчик
                            </DecoratedButton>
                        )
                    }
                </Group>
            </Stack>
        </>
    )
}