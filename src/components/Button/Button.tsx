import { ButtonHTMLAttributes } from "react";

export default function Button({
    children,
    custom,
    ...properties
}: {
    children: React.ReactNode;
    custom?: {
        appendClassNames?: string;
        pending?: boolean;
    };
} & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactNode {
    const appendClassNames = custom?.appendClassNames ?? "";
    const pending = custom?.pending ?? false;

    return (
        <>
            <button>

            </button>
            <button
                className={"flex gap-2 border-neutral-400 dark:border-neutral-700 border-[1px] rounded-md p-2 transition hover:border-neutral-800 dark:hover:border-neutral-300 " + appendClassNames}
                style={{
                    opacity: pending ? 0.6 : 1,
                    cursor: pending ? "default" : "pointer",
                }}
                { ...properties }
            >
                {children}
            </button>
        </>
    );
}