'use client';

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into its own file with 'use client' on top
import {
    QueryClientProvider,
    QueryClient,
    defaultShouldDehydrateQuery,
    isServer,
} from '@tanstack/react-query';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime:            60 * 1000,
                refetchOnWindowFocus: false,
                refetchOnMount:       false,
            },
            dehydrate: {
                // include pending queries in dehydration
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
}

export default function TanstackQueryProviders({ children }: { children:  React.ReactNode }) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
