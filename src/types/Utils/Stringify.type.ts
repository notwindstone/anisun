export type Stringify<T> = T extends object
    ? {
        [K in keyof T]?: Stringify<T[K]>;
    }
    : T extends undefined
        ? undefined
        : string;