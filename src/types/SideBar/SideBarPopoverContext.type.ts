import {Dispatch, SetStateAction} from "react";

export type SideBarPopoverContextType = {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
};