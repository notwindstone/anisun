export default function useInitialSearchParametersAsObject() {
    if (globalThis.window === undefined) {
        return;
    }

    const searchParametersAsString = globalThis.window.location.search;
    const searchParameters = new URLSearchParams(searchParametersAsString);

    return Object.fromEntries(searchParameters);
}
