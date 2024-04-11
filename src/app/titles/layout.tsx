import React, {Suspense} from 'react';
import {UserButton} from "@clerk/nextjs";
import Loading from "@/app/titles/[code]/loading";
import {Skeleton} from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Suspense fallback={<Skeleton />} />
            {children}
            <UserButton />
        </section>
    );
}