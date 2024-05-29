import {IconSearch} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";

const LABEL = "Поиск";
const REDIRECT_LINK = '/titles';

export default function SideBarSearch() {
    return (
        <SideBarButton
            icon={<IconSearch {...variables.iconProps} />}
            label={LABEL}
            redirectLink={REDIRECT_LINK}
        />
    );
}