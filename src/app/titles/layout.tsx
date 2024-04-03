import React from 'react';
import {UserButton} from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <UserButton />
            {children}
        </section>
    );
}