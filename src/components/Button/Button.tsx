import { ButtonHTMLAttributes } from "react";
import { ButtonCustomProperties } from "@/components/Button/Button.config";

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
    const {
        pending,
        appendClassNames,
    } = {
        ...ButtonCustomProperties,
        ...custom,
    };

    console.log(pending, appendClassNames)

    return (
        <>
            <button>

            </button>
            <button
                className={"flex gap-2 border-neutral-400 dark:border-neutral-700 disabled:border-neutral-400 dark:disabled:border-neutral-700  border-[1px] rounded-md p-2 transition hover:border-neutral-800 dark:hover:border-neutral-300 active:bg-neutral-200 dark:active:bg-neutral-800 " + appendClassNames}
                style={{
                    opacity: pending ? 0.6 : 1,
                    cursor: pending ? "default" : "pointer",

                }}
                disabled={pending}
                { ...properties }
            >
                {children}
            </button>
        </>
    );
}