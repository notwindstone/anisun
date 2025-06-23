import { RouteType } from "@/types/General/Route.type";

const safePathnames: Array<RouteType> = ["/", "/admin", "/anime", "/account", "/library", "/extensions"];
const placeholderState: Record<
    string,
    Record<string, string>
> = {
    "/admin": {
        "placeholder": "true",
    },
};

export default function getRouteState({
    searchParameters,
    currentPathname,
}: {
    searchParameters: URLSearchParams;
    currentPathname:  string;
}): Record<
    RouteType,
    Record<string, string>
> {
    // typescript is insane...
    const pathnameData: {
        safe: boolean;
        path: RouteType;
    } = {
        safe: false,
        path: "/",
    };

    for (const safePathname of safePathnames) {
        if (safePathname === `/${currentPathname}`) {
            pathnameData.safe = true;
            pathnameData.path = safePathname;
        }
    }

    if (!pathnameData.safe) {
        return placeholderState;
    }

    const searchParametersObject: Record<string, string> = {};

    for (const [key, value] of searchParameters.entries()) {
        searchParametersObject[key] = value;
    }

    const newState: Record<
        string,
        Record<string, string>
    > = {};

    newState[pathnameData.path] = searchParametersObject;

    return newState;
}
