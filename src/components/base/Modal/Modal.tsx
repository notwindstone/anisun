"use client";

import Button from "@/components/base/Button/Button";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import ModalTransition from "@/components/base/ModalTransition/ModalTransition";

export default function Modal({
    children,
    buttonChildren,
}: {
    children:       React.ReactNode;
    buttonChildren: React.ReactNode;
}) {
    const [show, setShow] = useState(false);
    const modalReference = useClickOutside(() => setShow(false));

    return (
        <div ref={modalReference} className="sm:relative">
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
                    >
                        {children}
                    </ModalTransition>
                )
            }
        </div>
    );
}
