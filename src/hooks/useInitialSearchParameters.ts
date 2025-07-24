export default function useInitialSearchParameters(parameter?: string) {
    if (!parameter) {
        return;
    }

    const searchParametersAsString = globalThis.window.location.search;
    const searchParameters = new URLSearchParams(searchParametersAsString);

    return searchParameters.get(parameter) ?? "";
}
