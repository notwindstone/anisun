"use client";

import {CheckIcon, ColorSwatch, MantineColor, rem, Tooltip} from "@mantine/core";
import {useEffect, useState} from "react";
import classes from './ColorSchemeControl.module.css';
import {variables} from "@/configs/variables";
import useCustomTheme from "@/hooks/useCustomTheme";

export default function ColorSchemeControl({ option }: { option: string }) {
    const { theme, setTheme } = useCustomTheme();
    const optionColor = option === "website" ? theme.color : theme.topLoaderColor;
    const [checkedColor, setCheckedColor] = useState(optionColor);

    function setColor(value: MantineColor) {
        setCheckedColor(value);

        switch (option) {
            case "website":
                setTheme({ ...theme, color: value });
                break;
            case "topLoader":
                setTheme({ ...theme, topLoaderColor: value });
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setCheckedColor(optionColor);
    }, [theme, option, optionColor]);

    const colorSwatches = variables.mantineColors.map((color) => {
        const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;

        return (
            <Tooltip
                key={color}
                label={color}
                position="top"
                transitionProps={{ transition: 'pop', duration: 300 }}
            >
                <ColorSwatch
                    component="button"
                    color={mantineColor}
                    onClick={() => setColor(color)}
                    className={classes.colorSwatch}
                    w={rem(32)}
                    h={rem(32)}
                >
                    {
                        checkedColor === color && (
                            <CheckIcon className={classes.checkIcon} />
                        )
                    }
                </ColorSwatch>
            </Tooltip>
        );
    });

    return (
        <>
            {colorSwatches}
        </>
    );
}