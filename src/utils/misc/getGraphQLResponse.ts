const getGraphQLResponse = async <T extends object>({
    url,
    query,
    variables,
    options,
    accessToken,
}: {
    url: string;
    query: string;
    variables: string;
    options?: Partial<Request> | undefined;
    accessToken?: string;
}): Promise<
        Record<
            string,
            (T | {
                media: Array<T>;
            })
        >
    > => {
    const response = await fetch(url, {
        method:  "POST",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken === undefined ? {} : {
                "Authorization": `Bearer ${accessToken}`,
            }),
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        ...options,
    });

    if (response.status === 404) {
        throw new Error("User not found");
    }

    if (!response.ok) {
        throw new Error("Something went wrong");
    }

    let data: {
        data:
            Record<
                string,
                (T | {
                    media: Array<T>;
                })
            >;
    };

    try {
        data = await response.json();
    } catch (error) {
        console.error("getGraphQLResponse.ts error:", error);

        throw new Error("Something went wrong");
    }

    return data.data;
};

export default getGraphQLResponse;
