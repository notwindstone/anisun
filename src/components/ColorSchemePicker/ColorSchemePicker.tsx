"use client";

import {ColorInput, ColorPicker, Stack} from "@mantine/core";
import {useState} from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import classes from './ColorSchemePicker.module.css';

export default function ColorSchemePicker({ option }: { option: string }) {
    const { theme, setTheme } = useCustomTheme();
    const [color, onChange] = useState('#000000');

    function updateColor() {
        setTheme({ ...theme, color: color })
    }

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
                <DecoratedButton variant="light" onClick={updateColor}>
                    Обновить
                </DecoratedButton>
            </Stack>
        </>
    )
}