'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, HydrationBoundary } from '@tanstack/react-query';

function Provider({ children }: any) {
    const [client] = useState(new QueryClient());

    return (
        <>
            <QueryClientProvider client={client}>
                <HydrationBoundary>
                    {children}
                </HydrationBoundary>
            </QueryClientProvider>
        </>
    );
}

export { Provider };
