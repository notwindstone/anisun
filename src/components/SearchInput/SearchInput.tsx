"use client";

import useCustomTheme from "@/hooks/useCustomTheme";
import useMobileScreen from "@/hooks/useMobileScreen";
import {useContext, useEffect, useState} from "react";
import {useDebouncedValue, useFocusWithin} from "@mantine/hooks";
import {variables} from "@/configs/variables";
import {TextInput} from "@mantine/core";
import {AdvancedSearchContext} from "@/utils/Contexts/Contexts";

export default function SearchInput() {
    const { setSearchInput } = useContext(AdvancedSearchContext);
    const [input, setInput] = useState('');
    const { theme } = useCustomTheme();
    const { isMobile } = useMobileScreen();
    const [search] = useDebouncedValue(input, 300);
    const { ref, focused } = useFocusWithin();
    const color = theme.color;
    // It can be MantineColor or HEXType code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color);
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;
    const calculatedColor = isMantineColor ? mantineColor : color;

    useEffect(() => {
        setSearchInput(search);
    }, [search, setSearchInput]);

    return (
        <TextInput
            flex={2}
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
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