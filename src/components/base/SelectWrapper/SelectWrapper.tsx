import { useMediaQuery } from "@mantine/hooks";
import Select from "@/components/base/Select/Select";
import NativeSelect from "@/components/base/NativeSelect/NativeSelect";

export default function SelectWrapper({
    parameter,
    options,
    callback,
    searchable,
    multiple,
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
    multiple?:   boolean;
}) {
    const isProbablyDesktop = useMediaQuery('(min-width: 640px)');

    // Show custom <Select /> component only on the desktop,
    // or if the select should be searchable,
    // or if it should handle multiple option selections
    if (isProbablyDesktop || searchable || multiple) {
        return (
            <Select
                parameter={parameter}
                options={options}
                callback={callback}
                searchable={searchable}
                multiple={multiple}
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
