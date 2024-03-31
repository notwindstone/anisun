'use client';

import { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';

type PushStateInput = [data: unknown, unused: string, url?: string | URL | null | undefined];

export function useProgressBar() {
    useEffect(() => {
        const handleAnchorClick = (event: MouseEvent) => {
            const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
            const currentUrl = window.location.href;

            if (targetUrl !== currentUrl) {
                nprogress.start();
            }
        };

        const handleMutation: MutationCallback = () => {
            const anchorElements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href]');
            anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
        };

        const mutationObserver = new MutationObserver(handleMutation);

        mutationObserver.observe(document, { childList: true, subtree: true });

        window.history.pushState = new Proxy(window.history.pushState, {
            apply: (target, thisArg, argArray: PushStateInput) => {
                nprogress.complete();
                return target.apply(thisArg, argArray);
            },
        });
    });
}