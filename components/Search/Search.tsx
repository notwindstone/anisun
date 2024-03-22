'use client';

import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteProps, Group, Image, Loader, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

interface TitleProps {
    names: {
        ru: string;
        en: string;
    }
}

/*
const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    console.log(option);

    return (
        <Group gap="sm">
            <div>
                <Image src="https://anilibria.tv/storage/releases/posters/9000/NBPPaSwgJrcoO4eg__f003bb6841ce26560a643491c197878f.jpg" radius="xl" />
            </div>
            <div>
                <Text size="sm">{option.value} Провожающая в последний путь Фрирен</Text>
                <Text size="xs" opacity={0.5}>Sousou no Frieren</Text>
            </div>
        </Group>
    );
};
 */

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
                const titles = responseData.list.map((title: TitleProps) => (
                    `${title.names.ru} / ${title.names.en}`
                ));

                setData(titles);
                setLoading(false);
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
            />
        </>
    );
}
