import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import React, {useState} from "react";
import SideBarPopover from "@/components/SideBar/SideBarPopover/SideBarPopover";
import SideBarSettingsTarget from "@/components/SideBar/SideBarSettings/SideBarSettingsTarget/SideBarSettingsTarget";
import SideBarSettingsDropdown
    from "@/components/SideBar/SideBarSettings/SideBarSettingsDropdown/SideBarSettingsDropdown";

export default function SideBarSettings() {
    const [expanded, setExpanded] = useState(false);

    return (
        <SideBarPopoverContext.Provider value={{ expanded, setExpanded }}>
            <SideBarPopover>
                <SideBarSettingsTarget />
                <SideBarSettingsDropdown />
            </SideBarPopover>
        </SideBarPopoverContext.Provider>
    );
}