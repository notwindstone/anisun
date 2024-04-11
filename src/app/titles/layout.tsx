import React, {Suspense} from 'react';
import {UserButton} from "@clerk/nextjs";
import Loading from "@/app/titles/[code]/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Suspense fallback={<Loading />} />
            {children}
            <UserButton />
        </section>
    );
}