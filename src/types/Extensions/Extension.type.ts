export type ExtensionType = {
    logo:        string;
    name:        string;
    url:         string;
    pages:       Array<string>;
    version:     string;
    author:      string;
    areStyles?:  boolean | undefined;
    isDisabled?: boolean | undefined;
};
