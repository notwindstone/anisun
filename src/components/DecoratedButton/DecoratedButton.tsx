"use client"

import {Button} from "@mantine/core";
import useRipple from "use-ripple-hook";
import classes from './DecoratedButton.module.css';
import {DecoratedButtonInterface} from "@/types/DecoratedButton/DecoratedButton.interface";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import {useLocalStorage} from "@mantine/hooks";
import defaultTheme from "@/configs/defaultTheme.json";
import {variables} from "@/configs/variables";
import useCustomTheme from "@/hooks/useCustomTheme";

export default function DecoratedButton({ children, onClick, rippleColor, ...props }: DecoratedButtonInterface) {
    const { theme } = useCustomTheme()
    const [rippleRef, rippleEvent] = useRipple({
        color: rippleColor ?? variables.rippleColor.color
    });

    return (
        <>
            <Button
                color={theme.color}
                {...props}
                classNames={{
                    root: classes.root,
                    label: classes.label,
                    inner: classes.inner
                }}
                ref={rippleRef}
                onPointerDown={rippleEvent}
                onClick={onClick}
            >
                {children}
            </Button>
        </>
    )
}