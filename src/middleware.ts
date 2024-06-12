// Yeah, it's deprecated. See https://stackoverflow.com/questions/77044738/vercel-blocking-google-from-indexing-website

import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default withClerkMiddleware((req: NextRequest) => {
    return NextResponse.next();
});

export const config = {
    matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};


/*
 * If you don't care about Google indexing, remove the legacy
 * code at the top of the file and uncomment the code below.
 */

/*

import { authMiddleware } from "@clerk/nextjs";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
    // Allow signed out users to access the specified routes:
    // publicRoutes: ['/anyone-can-visit-this-route'],
    publicRoutes: ['/', '/offline', '/account', '/titles', '/titles/(.*)', '/account/(.*)', '/trending']
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

 */