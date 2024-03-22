'use client';

import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps, ComboboxItem, Group, Image, Loader, OptionsFilter, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

interface TitleProps {
    names: {
        ru: string;
        en: string;
    }
}

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    console.log(option);

    return (
        <Group gap="sm">
            <div>
                <Image src="" radius="xl" />
            </div>
            <div>
                <Text size="sm">{option.value} Провожающая в последний путь Фрирен</Text>
                <Text size="xs" opacity={0.5}>Sousou no Frieren</Text>
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
        };

        onChange(value);
    }, [value]);

    return (
        <>
            <Autocomplete
              variant="unstyled"
              data={data}
              defaultValue={value}
              onChange={(event) => setValue(event)}
              placeholder="Поиск"
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
