import { create } from "zustand";
import { RouteType } from "@/types/General/Route.type";
import { InitialRouteStates } from "@/constants/app";

type queriesState = Record<
    RouteType,
    Record<string, string>
>;

// 2-3 weeks later:
// where tf is explanation for this code
// alr, seems like this is search params storage for every path
// so that navigation data persists. for example, when user searches
// some anime, then goes to any other page, then gets back,
// his anime search should persist, while retaining search params
const useQueriesStore = create<{
    queriesState:    queriesState;
    setQueriesState: (queryState: queriesState) => void;
}>()((set) => ({
    queriesState:    InitialRouteStates,
    setQueriesState: (queryState: queriesState) => set((state) => ({
        queriesState: { ...state.queriesState, ...queryState },
    })),
}));

export default useQueriesStore;
