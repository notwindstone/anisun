import { RouteType } from "@/types/General/Route.type";

const safePathnames: Array<RouteType> = ["/", "/admin", "/anime", "/account", "/library", "/extensions"];

export default function getRouteState({
    state,
    searchParameters,
    currentPathname,
}: {
    state: Record<
        RouteType,
        Record<string, string>
    >;
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
        return state;
    }

    const searchParametersObject: Record<string, string> = {};

    for (const [key, value] of searchParameters.entries()) {
        searchParametersObject[key] = value;
    }

    const newState = { ...state };

    newState[pathnameData.path] = searchParametersObject;

    return newState;
}
