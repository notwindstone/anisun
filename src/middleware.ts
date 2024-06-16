import {
    clerkMiddleware,
} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import locales from '@/configs/locales.json';

const intlMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: "en",
});

//const isProtectedRoute = createRouteMatcher([
//    'dashboard/(.*)',
//]);

export default clerkMiddleware((_auth, req) => {
    //if (isProtectedRoute(req)) auth().protect();

    return intlMiddleware(req);
});


export const config = {
    matcher: [
        // Exclude files with a "." followed by an extension, which are typically static files.
        // Exclude files in the _next directory, which are Next.js internals.
        "/((?!.+\\.[\\w]+$|_next).*)",
        // Re-include any files in the api or trpc folders that might have an extension
        "/(api|trpc)(.*)"
    ]
};