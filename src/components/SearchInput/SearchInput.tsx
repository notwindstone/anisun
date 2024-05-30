"use client";

import useCustomTheme from "@/hooks/useCustomTheme";
import useMobileScreen from "@/hooks/useMobileScreen";
import {useState} from "react";
import {useDebouncedValue, useFocusWithin} from "@mantine/hooks";
import {variables} from "@/configs/variables";
import {TextInput} from "@mantine/core";

export default function SearchInput() {
    const { theme } = useCustomTheme();
    const { isMobile } = useMobileScreen();
    const [input, setInput] = useState('');
    const [search] = useDebouncedValue(input, 300);
    const { ref, focused } = useFocusWithin();
    const color = theme.color;
    // It can be MantineColor or HEXType code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color);
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;
    const calculatedColor = isMantineColor ? mantineColor : color;

    return (
        <TextInput
            size={isMobile ? "md" : "xl"}
            ref={ref}
            styles={{
                input: {
                    borderColor: focused ? calculatedColor : "var(--mantine-color-default-border)"
                }
            }}
        />
    );
}