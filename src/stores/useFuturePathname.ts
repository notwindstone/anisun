import { create } from "zustand";

type futurePathnameType = {
    path: string;
    date: number;
};

const useFuturePathname = create<{
    futurePathname:    futurePathnameType;
    setFuturePathname: (path: futurePathnameType) => void;
}>()((set) => ({
    futurePathname: {
        path: "/",
        date: Date.now(),
    },
    setFuturePathname: (path: futurePathnameType) => set({
        futurePathname: path,
    }),
}));

export default useFuturePathname;
