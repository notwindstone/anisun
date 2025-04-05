"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function ColorSchemeChanger() {
    const { data } = useContext(ConfigsContext);

    return (
        <div>
            asd
            {data}
        </div>
    );
}