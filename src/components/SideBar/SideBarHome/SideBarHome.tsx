import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {IconHome} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import {useTranslations} from "next-intl";

const REDIRECT_LINK = '/';

export default function SideBarHome() {
    const translate = useTranslations('Translations');
    const homeLabel = translate('home-placeholder');

    return (
        <SideBarButton
            icon={<IconHome {...variables.iconProps} />}
            label={homeLabel}
            redirectLink={REDIRECT_LINK}
        />
    );
}