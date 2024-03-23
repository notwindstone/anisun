'use client';

import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps, Group, Image, Loader, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

interface TitleProps {
    posters: {
        small: {
            url: string;
        }
    },
    names: {
        ru: string;
        en: string;
    },
    status: {
        string: string;
    }
}

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    return (
        <Group gap="sm">
            <div>
                <Image src={optionData[0]} radius="xl" />
            </div>
            <div>
                <Text size="sm">{optionData[1]}</Text>
                <Text size="xs" opacity={0.5}>{optionData[2]}, {optionData[3]}</Text>
            </div>
        </Group>
    );
};

export function Search() {
    const [value, setValue] = useDebouncedState('', 200);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const onChange = async (keyInput: string) => {
            if (keyInput.length < 3) {
                return;
            }

            setLoading(true);

            const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${keyInput}&limit=6`);
            const responseData = await response.json();

            if (responseData.list.length < 1) {
                // @ts-ignore
                setData([{ label: 'asd', value: 'any', disabled: true }]);
                setLoading(false);
                return;
            }

            const titles = responseData.list.map((title: TitleProps) => (
                `https://anilibria.tv${title.posters.small.url}--${title.names.ru}--${title.status.string}--${title.names.en}`
            ));

            setData(titles);
            setLoading(false);

            /*
            if (keyInput.length >= 3) {
                setLoading(true);

                const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${keyInput}&limit=6`);
                const responseData = await response.json();

                if (responseData.list.length > 0) {
                    const titles = responseData.list.map((title: TitleProps) => (
                        `${title.names.ru} / ${title.names.en}`
                    ));

                    setData(titles);
                } else {
                    // @ts-ignore
                    setData([{ label: 'asd', value: any, disabled: true }]);
                }
                setLoading(false);
            } else {
                // @ts-ignore
                setData([{ value: 'Введите название от трёх символов', disabled: true }]);
            }
             */
        };

        onChange(value).then();
    }, [value]);

    return (
        <>
            <Autocomplete
              variant="unstyled"
              data={data}
              defaultValue={value}
              onChange={(event) => setValue(event)}
              placeholder="Введите название от трёх символов"
              rightSection={
                loading ? <Loader size="1rem" /> : null
              }
              onOptionSubmit={(option) => {
                  console.log(option);
              }}
              renderOption={renderAutocompleteOption}
            />
        </>
    );
}
