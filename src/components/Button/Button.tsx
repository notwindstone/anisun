import { ButtonHTMLAttributes, useContext } from "react";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function Button({
    children,
    label,
    custom,
    ...properties
}: {
    children: React.ReactNode;
    label: string;
    custom?: {
        appendClassNames?: string;
    };
} & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode {
    const { data: { colors: { accent } } } = useContext(ConfigsContext);
    const {
        appendClassNames,
    } = {
        appendClassNames: "",
        ...custom,
    };

    return (
        <>
            <button
                className={"text-white flex gap-2 rounded-md p-2 transition cursor-pointer disabled:opacity-60 disabled:cursor-default " + appendClassNames}
                style={{
                    background: parseTailwindColor({
                        color: accent,
                        step: 500,
                    }),
                }}
                aria-label={label}
                { ...properties }
            >
                {children}
            </button>
        </>
    );
}