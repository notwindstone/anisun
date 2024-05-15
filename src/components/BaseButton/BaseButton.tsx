"use client"

import {useContext} from "react";
import {CustomThemeContext} from "@/utils/Contexts";
import {Button} from "@mantine/core";
import useRipple from "use-ripple-hook";
import classes from './BaseButton.module.css';
import {DecoratedButtonType} from "@/types/DecoratedButton/DecoratedButton.type";

export default function BaseButton({ children, onClick, ...props }: DecoratedButtonType) {
    const { theme, setTheme } = useContext(CustomThemeContext);
    const [rippleRef, rippleEvent] = useRipple();

    return (
        <>
            <Button
                {...props}
                color={theme.color}
                classNames={{
                    root: classes.root,
                    label: classes.label,
                    inner: classes.inner
                }}
                ref={rippleRef}
                onPointerDown={rippleEvent}
                onClick={() => setTheme({ color: "dark" })}
            >
                {children}
            </Button>
        </>
    )
}