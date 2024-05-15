import {CheckIcon, ColorSwatch, MantineColor, rem} from "@mantine/core";
import {useContext, useState} from "react";
import {CustomThemeContext} from "@/utils/Contexts/Contexts";

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
const COLOR_SWATCH_STYLES = { color: '#fff', cursor: 'pointer' }
const CHECK_ICON_STYLES = { width: rem(12), height: rem(12) }

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
                color={color}
                onClick={() => setColor(color)}
                style={COLOR_SWATCH_STYLES}
            >
                {checkedColor === color && <CheckIcon style={CHECK_ICON_STYLES} />}
            </ColorSwatch>
        )
    })

    return (
        <>
            {colorSwatches}
        </>
    )
}