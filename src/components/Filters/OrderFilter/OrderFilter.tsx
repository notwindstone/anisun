import {Dispatch, memo, SetStateAction} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';
import calculateColor from "@/utils/Misc/calculateColor";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useDisclosure} from "@mantine/hooks";
import {useTranslations} from "next-intl";

export default memo(function OrderFilter({
    order,
    setOrder
}: {
    order: string | null,
    setOrder: Dispatch<SetStateAction<string | null>>
}) {
    const translate = useTranslations('Translations');
    const { theme } = useCustomTheme();
    const [focused, { open, close }] = useDisclosure(false);
    const color = calculateColor(theme.color);
    const orderData = variables.filters.order.map((order) => {
        return {
            label: translate(order.label),
            value: order.value,
        };
    });

    return (
        <Select
            onDropdownOpen={open}
            onDropdownClose={close}
            styles={{
                input: {
                    borderColor: focused ? color : undefined
                }
            }}
            classNames={classes}
            placeholder={translate('component__order-filter__order-label')}
            value={order}
            onChange={setOrder}
            data={orderData}
        />
    );
});