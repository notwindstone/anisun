import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import React, {useState} from "react";
import SideBarSearchTarget from "@/components/SideBar/SideBarSearch/SideBarSearchTarget/SideBarSearchTarget";
import SideBarSearchDropdown from "@/components/SideBar/SideBarSearch/SideBarSearchDropdown/SideBarSearchDropdown";

export default function SideBarSearch() {
    const [expanded, setExpanded] = useState(false);

    return (
        <SideBarPopoverContext.Provider value={{ expanded, setExpanded }}>
            <SideBarPopover>
                <SideBarSearchTarget />
                <SideBarSearchDropdown />
            </SideBarPopover>
        </SideBarPopoverContext.Provider>
    );
}