"use client"

import {Autocomplete, CloseButton} from "@mantine/core";
import classes from './SearchBar.module.css';
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import {IconSearch} from "@tabler/icons-react";
import NProgress from 'nprogress';

export default function SearchBar() {
    const router = useRouter();
    const [input, setInput] = useState('')
    const [search] = useDebouncedValue(input, 300);

    return (
        <>
            <Autocomplete
                comboboxProps={{ transitionProps: { transition: "fade-up" }, position: 'bottom' }}
                classNames={{
                    wrapper: classes.wrapper,
                    dropdown: classes.dropdown,
                    option: classes.option,
                    input: classes.input
                }}
                variant="unstyled"
                maxDropdownHeight={800}
                data={
                    [{ label: ' ', value: 'fetching', disabled: true }]
                }
                onChange={(event) => {
                    setInput(event)
                }}
                placeholder="Поиск"
                leftSection={
                    <IconSearch className={classes.icon} size="1rem" />
                }
                value={input}
                rightSectionPointerEvents="auto"
                rightSection={
                    input && (
                        <CloseButton
                            onClick={() => {
                                setInput('')
                                }
                            }
                        />
                    )
                }
                onOptionSubmit={(option) => {
                    // Если функция close существует, то она вызывается
                    close && close()
                    NProgress.start()
                    router.push(`/titles/${option.split('--')[0]}`);
                }}
            />
        </>
    )
}