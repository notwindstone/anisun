"use client";

import useCustomTheme from "@/hooks/useCustomTheme";
import useMobileScreen from "@/hooks/useMobileScreen";
import {useContext, useEffect, useState} from "react";
import {useDebouncedValue, useFocusWithin} from "@mantine/hooks";
import {TextInput} from "@mantine/core";
import {AdvancedSearchContext} from "@/utils/Contexts/Contexts";
import calculateColor from "@/utils/Misc/calculateColor";
import classes from './SearchInput.module.css';
import {IconSearch} from "@tabler/icons-react";
import {useTranslations} from "next-intl";

export default function SearchInput() {
    const translate = useTranslations('Translations');
    const { setSearchInput } = useContext(AdvancedSearchContext);
    const [input, setInput] = useState('');
    const { theme } = useCustomTheme();
    const { isMobile } = useMobileScreen();
    const [search] = useDebouncedValue(input, 300);
    const { ref, focused } = useFocusWithin();
    const color = calculateColor(theme.color);

    useEffect(() => {
        setSearchInput(search);
    }, [search, setSearchInput]);

    return (
        <TextInput
            classNames={classes}
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
            size={isMobile ? "md" : "xl"}
            ref={ref}
            placeholder={translate('common__search-placeholder')}
            leftSection={
                <IconSearch size={24} stroke={1.5} />
            }
            styles={{
                input: {
                    borderColor: focused ? color : "#0000"
                }
            }}
        />
    );
}