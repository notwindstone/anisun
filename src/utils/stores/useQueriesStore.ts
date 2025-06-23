import { create } from "zustand";
import { RouteType } from "@/types/General/Route.type";
import { InitialRouteStates } from "@/constants/app";

type queriesState = Record<
    RouteType,
    Record<string, string>
>;

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
