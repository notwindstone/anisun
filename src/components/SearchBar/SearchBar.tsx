'use client';

import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
    Autocomplete,
    AutocompleteProps,
    CloseButton,
    ComboboxItem,
    Flex,
    Image,
    OptionsFilter,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import {useDebouncedValue} from '@mantine/hooks';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {IconSearch} from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import searchAutocomplete from './../../configs/searchAutocomplete.json';
import NProgress from 'nprogress';
import NextImage from 'next/image'
import translateShikimoriStatus from "@/utils/translateShikimoriStatus";
import {client} from "@/lib/shikimori/client";
import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";
import globalVariables from '../../configs/globalVariables.json'
import translateShikimoriKind from "@/utils/translateShikimoriKind";
import {SearchBarDataType} from "@/types/SearchBarDataType";

// Фильтр полученных пунктов и вывод "Ничего не найдено" или "Введите название аниме" в зависимости от значения
// Я не понял, как работает optionsFilter в Mantine, но он работает так, как мне нужно, поэтому всё отлично
const optionsFilter: OptionsFilter = ({ options }) => (options as ComboboxItem[]).filter(() => ({ value: ' ', label: ' ' }));

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
    const optionData = option.value.split('--');

    const posterSourceURL =
        optionData[1] === 'undefined'
            ? '/missing-image.png'
            : optionData[1]
    const russianName = optionData[2]
    let kind = translateShikimoriKind(optionData[3])
    let status = translateShikimoriStatus(optionData[4])
    const englishName = optionData[5]

    switch (option.value) {
        case 'nothing':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="md" src={searchAutocomplete.nothing.image} />
                    <Title order={3}>{searchAutocomplete.nothing.label}</Title>
                </Stack>
            );
        case 'noValue':
            return (
                <Stack className={classes.stack} align="center" justify="center">
                    <Image className={classes.poster} alt="Anime character" radius="md" src={searchAutocomplete.noValue.image} />
                    <Title order={3}>{searchAutocomplete.noValue.label}</Title>
                </Stack>
            )
        case 'fetching':
            return (
                <Flex align="center" gap="md">
                    <div>
                        <Skeleton width={96} height={128} />
                    </div>
                    <div>
                        <Skeleton height={24} width={256} radius="xl" mb="xs" />
                        <Skeleton height={24} width={256} radius="xl" mb="xs" />
                        <Skeleton height={24} width={256} radius="xl" />
                    </div>
                </Flex>
            )
    }

    return (
        <Flex align="center" gap="md">
            <div>
                <Image
                    alt="Anime poster"
                    src={posterSourceURL}
                    placeholder="blur"
                    blurDataURL={globalVariables.imagePlaceholder}
                    width={96}
                    height={128}
                    component={NextImage}
                    className={classes.poster}
                    radius="md"
                />
            </div>
            <div>
                <Title lineClamp={2} order={3}>{russianName}</Title>
                <Text lineClamp={2} size="lg" opacity={0.8}>{kind}</Text>
                <Text lineClamp={2} size="md" opacity={0.5}>{status}{englishName ? `, ${englishName}` : []}</Text>
            </div>
        </Flex>
    );
};

export default function SearchBar() {
    const shikimori = client();
    const router = useRouter();
    const [input, setInput] = useState('')
    const [search] = useDebouncedValue(input, 300);

    // TypeScript is insane (это пиздец ебаный, в смысле type boolean is not assignable to type true
    // сука он вообще нахуй? или это я дебил и не понимаю чего-то тут
    // @ts-ignore
    const [
        titles,
        setTitles
    ]: [
        titles: SearchBarDataType,
        setTitles: Dispatch<SetStateAction<SearchBarDataType>>
    ] = useState([{
        label: ' ',
        value: 'noValue',
        disabled: true
    }]);

    const { data, isFetching } = useQuery({
        queryKey: ['titles', search],
        queryFn: async () => fetchTitles(search),
    });

    async function fetchTitles(keyInput: string) {
        const isOnlyWhiteSpace = !keyInput.replace(/\s/g, '').length

        if (isOnlyWhiteSpace) {
            return [{label: ' ', value: 'noValue', disabled: true}]
        }
        
        const searchList = (await shikimori.animes.list({
            search: keyInput,
            limit: 10
        })).animes

        if (searchList.length < 1) {
            return [{label: ' ', value: 'nothing', disabled: true}];
        }

        return searchList.map((title: AnimeType) => {
            const titleCode = title.url.replace('https://shikimori.one/animes/', '')
            const posterSourceURL = title.poster?.mainUrl

            return (
                {
                    value: `${titleCode}--${posterSourceURL}--${title.russian}--${title.kind}--${title.status}--${title.name}`,
                    label: `${title.russian} / ${title.name}`,
                }
            )
        });
    }

    useEffect(() => {
        // Не проблема, т.к. есть проверка на isFetching в <Autocomplete data={проверка} />
        // @ts-ignore
        setTitles(data)
    }, [data]);

    return (
        <>
            <Autocomplete
                classNames={{
                    wrapper: classes.wrapper,
                    dropdown: classes.dropdown
                }}
                variant="unstyled"
                maxDropdownHeight={800}
                data={
                    isFetching
                        ? [{ label: ' ', value: 'fetching', disabled: true }]
                        : titles
                }
                onChange={(event) => {
                    setInput(event)
                }}
                placeholder="Поиск"
                leftSection={
                    <IconSearch size="1rem" />
                }
                value={input}
                rightSectionPointerEvents="auto"
                rightSection={
                    search
                        && <CloseButton onClick={() => {
                            setInput('')
                        }} />
                }
                onOptionSubmit={(option) => {
                    NProgress.start()
                    router.push(`/titles/${option.split('--')[0]}`);
                }}
                renderOption={renderAutocompleteOption}
                filter={optionsFilter}
            />
        </>
    );
}