import { AnyOption } from "@/constants/app";

const transformIntoDropdownOptions = (
    data:      Array<string | number | {
        name:  string;
        value: string;
    }>,
    multiple?: boolean,
): Array<{
    name:  string;
    value: string;
}> => {
    const transformedData = data.map((item) => {
        if (typeof item === "object") {
            return item;
        }

        return {
            name:  item.toString(),
            value: item.toString(),
        };
    });

    if (!multiple) {
        transformedData.unshift(AnyOption);
    }

    return transformedData;
};

export default transformIntoDropdownOptions;
