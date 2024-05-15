import React from "react";
import {ButtonProps} from "@mantine/core";

export interface DecoratedButtonInterface extends ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    rippleColor?: string;
}