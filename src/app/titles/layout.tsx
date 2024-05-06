import React, {Suspense} from 'react';
import {UserButton} from "@clerk/nextjs";
import {Skeleton} from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Suspense fallback={<Skeleton width={256} height={256} />} />
            {children}
        </section>
    );
}