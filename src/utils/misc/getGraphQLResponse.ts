const getGraphQLResponse = async <T extends object>({
    url,
    query,
    variables,
    options,
}: {
    url: string;
    query: string;
    variables: string;
    options?: Partial<Request> | undefined;
}): Promise<T> => {
    const response = await fetch(url, {
        method:  "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        ...options,
    });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    let data: {
        data: {
            Page: {
                media: T;
            }
        } | {
            Media: T;
        }
    };

    try {
        data = await response.json();
    } catch (error) {
        console.error("getGraphQLResponse.ts error:", error);

        throw new Error("Something went wrong");
    }

    if ("Page" in data.data) {
        return data.data.Page.media;
    }

    return data.data.Media;
};

export default getGraphQLResponse;