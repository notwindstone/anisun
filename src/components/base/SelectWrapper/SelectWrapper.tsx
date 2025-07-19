import { useMediaQuery } from "@mantine/hooks";
import Select from "@/components/base/Select/Select";
import NativeSelect from "@/components/base/NativeSelect/NativeSelect";

export default function SelectWrapper({
    parameter,
    options,
    callback,
    searchable,
}: {
    parameter: string;
    options:   Array<{
        name:  string;
        value: string;
    }>;
    callback: ({
        parameter,
        value,
    }: {
        parameter: string;
        value:     string;
    }) => void;
    searchable?: boolean;
}) {
    const isProbablyDesktop = useMediaQuery('(min-width: 640px)');

    if (isProbablyDesktop) {
        return (
            <Select
                parameter={parameter}
                options={options}
                callback={callback}
                searchable={searchable}
            />
        );
    }

    return (
        <NativeSelect
            parameter={parameter}
            options={options}
            callback={callback}
        />
    );
}
