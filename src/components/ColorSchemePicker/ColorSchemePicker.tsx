"use client";

import {ColorInput, ColorPicker, Stack} from "@mantine/core";
import {useState} from "react";
import useCustomTheme from "@/hooks/useCustomTheme";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import classes from './ColorSchemePicker.module.css';

export default function ColorSchemePicker() {
    const { theme, setTheme } = useCustomTheme();
    const [color, onChange] = useState('#000000');

    function updateColor() {
        setTheme({ ...theme, color: color })
    }

    return (
        <>
            <Stack className={classes.stack}>
                <ColorPicker
                    value={color}
                    onChange={onChange}
                />
                <ColorInput
                    value={color}
                    onChange={onChange}
                    withPicker={false}
                    variant="unstyled"
                    placeholder="Введите цвет"
                />
                <DecoratedButton onClick={updateColor}>
                    Обновить
                </DecoratedButton>
            </Stack>
        </>
    )
}