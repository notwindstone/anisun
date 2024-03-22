'use client';

import { useEffect, useState } from 'react';
import { Autocomplete, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

interface TitleProps {
    names: {
        ru: string;
        en: string;
    }
}

export function Search() {
    const [value, setValue] = useDebouncedState('', 300, { leading: true });
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

        onChange(value)
            .catch(console.error);
    }, [value]);

    return (
        <>
            <Autocomplete
              data={data}
              defaultValue={value}
              onChange={(event) => setValue(event)}
              placeholder="Поиск"
            />
        </>
    );
}
