export type Generalise<T> = T extends object
    ? {
        [K in keyof T]?: Generalise<T[K]>;
    }
    : T extends undefined
        ? undefined
        : T extends string
            ? string
            : T;