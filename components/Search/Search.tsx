'use client';

import { useEffect, useState } from 'react';
import { AutocompleteProps, ComboboxItem, Group, Image, Loader, OptionsFilter, Select, Text } from '@mantine/core';
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

const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter((option) => ({ value: 'das', label: 'asd' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    if (option.value === 'nothing') {
        return (
            <>Ничего не найдено.</>
        );
    }

    return (
        <Group gap="sm">
            <div>
                <Image src={optionData[0]} radius="xl" />
            </div>
            <div>
                <Text size="sm">{optionData[1]}</Text>
                <Text size="xs" opacity={0.5}>{optionData[2]}{optionData[3] ? `, ${optionData[3]}` : []}</Text>
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
                setData([{ label: ' ', value: 'nothing', disabled: true }]);
                setLoading(false);
                return;
            }

            const titles = responseData.list.map((title: TitleProps) => (
                {
                    value: `https://anilibria.tv${title.posters.small.url}--${title.names.ru}--${title.status.string}--${title.names.en}`,
                    label: `${title.names.ru} / ${title.names.en}`,
                }
            ));

            setData(titles);
            setLoading(false);
        };

        onChange(value).then();
    }, [value]);

    return (
        <>
            <Select
              searchable
              variant="unstyled"
              data={data}
              defaultValue={value}
              onSearchChange={(event) => setValue(event)}
              placeholder="Введите название от трёх символов"
              rightSection={
                loading ? <Loader size="1rem" /> : null
              }
              onOptionSubmit={(option) => {
                  console.log(option);
              }}
              renderOption={renderAutocompleteOption}
              filter={optionsFilter}
            />
        </>
    );
}
