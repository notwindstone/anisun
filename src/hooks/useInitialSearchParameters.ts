export default function useInitialSearchParameters(parameter?: string) {
    if (!parameter || globalThis.window === undefined) {
        return;
    }

    const searchParametersAsString = globalThis.window.location.search;
    const searchParameters = new URLSearchParams(searchParametersAsString);

    return searchParameters.get(parameter) ?? "";
}
