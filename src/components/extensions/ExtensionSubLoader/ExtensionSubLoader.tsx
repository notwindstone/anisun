"use client";

import { ManifestType } from "@/types/Extensions/Extension.type";
import { useQuery } from "@tanstack/react-query";
import { ExtensionFunctionType } from "@/types/Extensions/ExtensionFunction.type";
import { useEffect } from "react";

export default function ExtensionSubLoader({
    extension,
}: {
    extension: ManifestType;
}): React.ReactNode {
    const { data, isError, error } = useQuery({
        queryKey: ["extensions", "entry", extension.id],
        queryFn:  async () => {
            const response = await fetch(extension.url);
            const code = await response.text();
            const pluginFunction = new Function("module", "exports", code) as ExtensionFunctionType;

            pluginFunction({ exports: {} }, {});

            return 1;
        },
    });

    useEffect(() => {
        console.log(
            `%c${extension.name}`,
            "background-color:black;color:white",
            "extension status:",
            data,
            "is error:",
            isError,
            "error message:",
            error,
        );
    }, [extension.name, data, isError, error]);

    return;
}