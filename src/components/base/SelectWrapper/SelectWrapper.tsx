import { useMediaQuery } from "@mantine/hooks";
import Select from "@/components/base/Select/Select";
import NativeSelect from "@/components/base/NativeSelect/NativeSelect";

export default function SelectWrapper({
    parameter,
    options,
    callback,
    searchable,
    multiple,
    label,
    additionalClassNames,
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
    searchable?:           boolean;
    multiple?:             boolean;
    label:                 string;
    additionalClassNames?: string;
}) {
    const isProbablyDesktop = useMediaQuery(
        '(min-width: 640px)',
        // `useMediaQuery` returns `undefined` when component re-creates even if it's CSR already
        // and only then triggers a re-render and returns valid viewport
        globalThis?.window?.innerWidth >= 640,
    );

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
                label={label}
                additionalClassNames={additionalClassNames}
            />
        );
    }

    return (
        <NativeSelect
            parameter={parameter}
            options={options}
            callback={callback}
            label={label}
            additionalClassNames={additionalClassNames}
        />
    );
}
