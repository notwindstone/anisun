import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import {ColorSchemeScript, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {NextNavigationProgress} from "@/components/NavigationProgress/NextNavigationProgress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Animeth",
    description: "Anime player on NextJS with Tanstack Query, Drizzle ORM, NeonDB, Mantine UI kit and Shikimori, Anilibria APIs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={inter.className}>
                <MantineProvider>
                    <NextNavigationProgress />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
