"use client";

import Button from "@/components/base/Button/Button";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import ModalTransition from "@/components/base/ModalTransition/ModalTransition";

export default function Modal({
    children,
    buttonChildren,
    label,
    description,
    shouldBeRelative,
    additionalClassNames,
}: {
    children:       React.ReactNode;
    buttonChildren: React.ReactNode;
    label:          string | undefined;
    description:    string | undefined;
    /** `false` if you define `relative` position on components that are higher in the tree */
    shouldBeRelative:      boolean;
    additionalClassNames?: string;
}) {
    const [show, setShow] = useState(false);
    const modalReference = useClickOutside(() => setShow(false));

    return (
        <div ref={modalReference} className={shouldBeRelative ? "sm:relative" : ""}>
            <Button
                onClick={() => {
                    setShow((state) => !state);
                }}
                label="Trigger Modal"
            >
                {buttonChildren}
            </Button>
            {
                show && (
                    <ModalTransition
                        hide={() => setShow(false)}
                        // some prop drilling
                        // should be ok, because these things don't update
                        label={label}
                        description={description}
                        additionalClassNames={additionalClassNames}
                    >
                        {children}
                    </ModalTransition>
                )
            }
        </div>
    );
}
