"use client";

import Button from "@/components/base/Button/Button";
import { useState } from "react";
import {useClickOutside} from "@mantine/hooks";

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
        <>
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
                    <div
                        ref={modalReference}
                        className="absolute top-[50%] left-[50%] bg-amber-950 p-16 -translate-x-[50%] -translate-y-[50%] z-1000"
                    >
                        {children}
                    </div>
                )
            }
        </>
    );
}
