import {Popover, rem, SegmentedControl, Stack} from "@mantine/core";
import classes from './SideBarSettingsDropdown.module.css';
import useCustomTheme from "@/hooks/useCustomTheme";
import {useState} from "react";
import {variables} from "@/configs/variables";

const GENERAL = variables.settings.general
const ABOUT = variables.settings.about

export default function SideBarSettingsDropdown() {
    const { theme } = useCustomTheme()
    const [section, setSection] = useState<string>(GENERAL.value)

    let content

    switch (section) {
        case "about":
            content = (
                <></>
            )
            break
        case "general":
        default:
            content = (
                <></>
            )
            break
    }

    return (
        <Popover.Dropdown>
            <Stack gap={0}>
                <SegmentedControl
                    color={theme.color}
                    classNames={{
                        root: classes.root
                    }}
                    withItemsBorders={false}
                    value={section}
                    onChange={setSection}
                    data={[
                        GENERAL,
                        ABOUT
                    ]}
                />
                {content}
            </Stack>
        </Popover.Dropdown>
    )
}