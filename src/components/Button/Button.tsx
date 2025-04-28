import { ButtonHTMLAttributes, useContext, useState } from "react";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function Button({
    children,
    label,
    custom,
    ...properties
}: {
    children: React.ReactNode;
    /** Sets aria-label */
    label: string;
    /** Custom properties */
    custom?: {
        appendClassNames?: string;
    };
} & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode {
    const [animation, triggerAnimation] = useState<number | undefined>();
    const { data: { colors: { accent } } } = useContext(ConfigsContext);
    const {
        appendClassNames,
    } = {
        appendClassNames: "",
        ...custom,
    };
    const animationClassName = animation ? "animate-click" : "";

    return (
        <>
            <button
                key={animation}
                className={`text-white flex gap-2 rounded-md p-2 cursor-pointer disabled:opacity-60 disabled:cursor-default hover:brightness-75 ${animationClassName} ${appendClassNames}`}
                style={{
                    background: parseTailwindColor({
                        color: accent,
                        step: 500,
                    }),
                }}
                aria-label={label}
                { ...properties }
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    triggerAnimation(Math.random());
                    properties?.onClick?.(event);
                }}
            >
                {children}
            </button>
        </>
    );
}