"use client"

import {useLocalStorage} from "@mantine/hooks";

export default function BaseButton() {
    const [value, setValue] = useLocalStorage({
        key: 'settings',
        defaultValue: {
            color: "dark"
        },
    });

    return (
        <>
            {value.color}
        </>
    )
}