import {IconSearch} from "@tabler/icons-react";
import {variables} from "@/configs/variables";
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import {useTranslations} from "next-intl";

const REDIRECT_LINK = '/titles';

export default function SideBarSearch() {
    const translate = useTranslations('Translations');
    const searchLabel = translate('search-placeholder');

    return (
        <SideBarButton
            icon={<IconSearch {...variables.iconProps} />}
            label={searchLabel}
            redirectLink={REDIRECT_LINK}
        />
    );
}