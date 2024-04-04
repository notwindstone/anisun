import React, {Suspense} from 'react';
import {UserButton} from "@clerk/nextjs";
import Loading from "@/app/titles/[code]/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <UserButton />
            <Suspense fallback={<Loading />} />
            {children}
        </section>
    );
}