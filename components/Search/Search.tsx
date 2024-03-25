'use client';

import { useState } from 'react';
import {
    AutocompleteProps,
    ComboboxItem,
    Group, Image,
    Loader,
    OptionsFilter,
    Select,
    Text,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styles from './Search.module.css';

interface TitleProps {
    code: string;
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

const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: 'das', label: 'asd' }));

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
                <Image className={styles.poster} src={optionData[1]} />
            </div>
            <div>
                <Text size="sm">{optionData[2]}</Text>
                <Text size="xs" opacity={0.5}>{optionData[3]}{optionData[4] ? `, ${optionData[4]}` : []}</Text>
            </div>
        </Group>
    );
};

export function Search() {
    const router = useRouter();
    const [value, setValue] = useDebouncedState('', 300);
    const [titles, setTitles] = useState([]);

    const { isPending } = useQuery({
        queryKey: ['titles', value],
        queryFn: () => fetchTitles(value),
    });

    async function fetchTitles(keyInput: string) {
        if (keyInput.length < 3) {
            return;
        }

        const searchList = (await axios.get(`https://api.anilibria.tv/v3/title/search?search=${keyInput}&limit=6`)).data.list;

        if (searchList < 1) {
            // @ts-ignore
            setTitles([{ label: ' ', value: 'nothing', disabled: true }]);
            return;
        }

        const titlesList = searchList.map((title: TitleProps) => (
            {
                value: `${title.code}--https://anilibria.tv${title.posters.small.url}--${title.names.ru}--${title.status.string}--${title.names.en}`,
                label: `${title.names.ru} / ${title.names.en}`,
            }
        ));

        setTitles(titlesList);
    }

    /*
    useEffect(() => {
        const onChange = async (keyInput: string) => {
            if (keyInput.length < 3) {
                return;
            }

            setLoading(true);

            const responseData = await axios.get(`https://api.anilibria.tv/v3/title/search?search=${keyInput}&limit=6`).then(({ data }) => data);

            if (responseData.list.length < 1) {
                // @ts-ignore
                setData([{ label: ' ', value: 'nothing', disabled: true }]);
                setLoading(false);
                return;
            }

            const titles = responseData.list.map((title: TitleProps) => (
                {
                    value: `${title.code}--https://anilibria.tv${title.posters.small.url}--${title.names.ru}--${title.status.string}--${title.names.en}`,
                    label: `${title.names.ru} / ${title.names.en}`,
                }
            ));

            setData(titles);
            setLoading(false);
        };

        onChange(value).then();
    }, [value]);
     */

    return (
        <>
            <Select
              searchable
              variant="unstyled"
              data={titles}
              defaultValue={value}
              onSearchChange={(event) => setValue(event)}
              placeholder="Введите название от трёх символов"
              rightSection={
                isPending ? <Loader size="1rem" /> : null
              }
              onOptionSubmit={(option) => {
                  router.push(`/titles/${option.split('--')[0]}`);
              }}
              renderOption={renderAutocompleteOption}
              filter={optionsFilter}
            />
        </>
    );
}
