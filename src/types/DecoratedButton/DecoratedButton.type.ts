import React from "react";
import {ButtonProps} from "@mantine/core";

export type DecoratedButtonType = {
    children?: React.ReactNode;
    onClick?: () => void;
    props?: ButtonProps;
}