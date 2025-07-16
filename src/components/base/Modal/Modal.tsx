"use client";

import Button from "@/components/base/Button/Button";
import { useState } from "react";

export default function Modal({
    children,
}: {
    children: React.ReactNode;
}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button label="Trigger Modal">
                {children}
            </Button>
        </>
    );
}
