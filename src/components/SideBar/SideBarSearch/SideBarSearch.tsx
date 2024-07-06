import {IconSearch} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {useTranslations} from "next-intl";

export default function SideBarSearch() {
    const translate = useTranslations('Translations');
    const searchLabel = translate('common__search-placeholder');

    const info = useTranslations('Info');
    const locale = info('locale');
    const REDIRECT_LINK = `/${locale}/titles`;

    return (
        <SideBarButton
            icon={<IconSearch {...variables.iconProps} />}
            label={searchLabel}
            redirectLink={REDIRECT_LINK}
        />
    );
}