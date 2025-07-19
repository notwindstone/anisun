import { ChevronDown } from "lucide-react";

export default function NativeSelect({
    parameter,
    options,
    callback,
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
        parameter:  string;
        value: string;
    }) => void,
}) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm">
                Select an option
            </p>
            <div
                className="group relative rounded-md bg-neutral-200 dark:bg-neutral-800 w-fit flex gap-2 flex-nowrap items-center transition ring-2 ring-transparent dark:focus-within:ring-white focus-within:ring-black"
            >
                <select
                    className="cursor-pointer min-w-48 pl-4 pr-12 h-10 flex bg-inherit rounded-md appearance-none text-sm outline-none"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = event.target.value;

                        callback({
                            parameter,
                            value,
                        });
                    }}
                >
                    {
                        options.map((option) => {
                            return (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.name}
                                </option>
                            );
                        })
                    }
                </select>
                <ChevronDown
                    className="absolute right-4 pointer-events-none"
                    size={16}
                />
            </div>
        </div>
    );
}
