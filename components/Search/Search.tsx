'use client';

import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps, Group, Image, Text } from '@mantine/core';
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
            <Image src="https://cache.libria.fun/storage/releases/posters/9000/NBPPaSwgJrcoO4eg__f003bb6841ce26560a643491c197878f.jpg" size={36} radius="xl" />
            <div>
                <Text size="sm"></Text>
                <Text size="xs" opacity={0.5}>
                </Text>
            </div>
        </Group>
    );
};

export function Search() {
    const [value, setValue] = useDebouncedState('', 200);
    const [data, setData] = useState([]);

    useEffect(() => {
        const onChange = async (keyInput: string) => {
            if (keyInput.length >= 3) {
                const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${keyInput}&limit=5`);
                const responseData = await response.json();
                const titles = responseData.list.map((title: TitleProps) => (
                    `${title.names.ru} / ${title.names.en}`
                ));
                setData(titles);
            }
        };

        onChange(value);
    }, [value]);

    return (
        <>
            <Autocomplete
              variant="unstyled"
              data={[
                  { group: 'Возможно, вы искали', items: data },
              ]}
              renderOption={renderAutocompleteOption}
              defaultValue={value}
              onChange={(event) => setValue(event)}
              placeholder="Поиск"
            />
        </>
    );
}
