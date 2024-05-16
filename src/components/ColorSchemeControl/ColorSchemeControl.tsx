import {CheckIcon, ColorSwatch, MantineColor, Tooltip} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import classes from './ColorSchemeControl.module.css';

const MANTINE_COLORS: MantineColor[] = [
    "black",
    "dark",
    "gray",
    "red",
    "pink",
    "grape",
    "violet",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "green",
    "lime",
    "yellow",
    "orange"
]

export default function ColorSchemeControl() {
    const { theme, setTheme } = useContext(CustomThemeContext);
    const [checkedColor, setCheckedColor] = useState(theme.color);

    function setColor(value: MantineColor) {
        setCheckedColor(value)
        setTheme({ color: value, breadcrumb: theme.breadcrumb })
    }

    useEffect(() => {
        setCheckedColor(theme.color)
    }, [theme]);

    const colorSwatches = MANTINE_COLORS.map((color) => {
        const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`

        return (
            <Tooltip
                key={color}
                label={color}
                position="right"
                transitionProps={{ transition: 'pop', duration: 300 }}
            >
                <ColorSwatch
                    component="button"
                    color={mantineColor}
                    onClick={() => setColor(color)}
                    className={classes.colorSwatch}
                >
                    {
                        checkedColor === color && (
                            <CheckIcon className={classes.checkIcon} />
                        )
                    }
                </ColorSwatch>
            </Tooltip>
        )
    })

    return (
        <>
            {colorSwatches}
        </>
    )
}