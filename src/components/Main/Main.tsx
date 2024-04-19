import React from "react";
import classes from './Main.module.css'

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}