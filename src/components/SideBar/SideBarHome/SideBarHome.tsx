import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {IconHome} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import {useTranslations} from "next-intl";

export default function SideBarHome() {
    const translate = useTranslations('Translations');
    const homeLabel = translate('common__home-label');

    const info = useTranslations('Info');
    const locale = info('locale');
    const REDIRECT_LINK = `/${locale}`;

    return (
        <SideBarButton
            icon={<IconHome {...variables.iconProps} />}
            label={homeLabel}
            redirectLink={REDIRECT_LINK}
        />
    );
}