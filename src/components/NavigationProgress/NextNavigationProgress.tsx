'use client';

import { NavigationProgress, type NavigationProgressProps } from '@mantine/nprogress';

import { useProgressBar } from './useProgressBar';

export function NextNavigationProgress(props: NavigationProgressProps) {
    useProgressBar();
    return <NavigationProgress {...props} />;
}