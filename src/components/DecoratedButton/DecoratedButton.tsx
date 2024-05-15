"use client"

import {useContext} from "react";
import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import {Button} from "@mantine/core";
import useRipple from "use-ripple-hook";
import classes from './DecoratedButton.module.css';
import {DecoratedButtonInterface} from "@/types/DecoratedButton/DecoratedButton.interface";

export default function DecoratedButton({ children, onClick, rippleColor, ...props }: DecoratedButtonInterface) {
    const { theme } = useContext(CustomThemeContext);
    const [rippleRef, rippleEvent] = useRipple({
        color: rippleColor ?? 'var(--animeth-ripple-color)'
    });

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
                onClick={onClick}
            >
                {children}
            </Button>
        </>
    )
}