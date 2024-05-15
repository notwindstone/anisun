import {CheckIcon, ColorSwatch, MantineColor} from "@mantine/core";
import {useContext, useState} from "react";
import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import classes from './ColorSchemeControl.module.css';

const MANTINE_COLORS: MantineColor[] = [
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

    const colorSwatches = MANTINE_COLORS.map((color) => {
        return (
            <ColorSwatch
                key={color}
                component="button"
                color={`var(--mantine-color-${color}-6)`}
                onClick={() => setColor(color)}
                className={classes.colorSwatch}
            >
                {
                    checkedColor === color && (
                        <CheckIcon className={classes.checkIcon} />
                    )
                }
            </ColorSwatch>
        )
    })

    return (
        <>
            {colorSwatches}
        </>
    )
}