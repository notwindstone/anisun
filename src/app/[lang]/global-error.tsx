"use client"; // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    console.log(error);

    return (
        // global-error must include html and body tags
        <html>
            <body className="bg-black text-white">
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()}>
                    Try again
                </button>
            </body>
        </html>
    );
}