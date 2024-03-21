'use client';

import { useState, useRef } from 'react';
import { Autocomplete, Loader } from '@mantine/core';

export async function getData() {
    const res = await fetch('https://api.anilibria.tv/v3/title/search?search=&limit=1');
    const response = await res.json();
}

export function Search() {
    const [query, setQuery] = useState('');

    const data = [];
    const onChange = async (e) => {
        const value = e.key;
        console.log(e, e.key)
        setQuery(value);

        if (value.length > 3) {
            const response = await fetch('https://api.anilibria.tv/v3/title/search?search=frieren&limit=1');
            const data = await response.json();
            console.log(data);
        }
    };
    return (
        <Autocomplete
          data={data}
          onChange={onChange}
          placeholder="Your email"
        />
    );
}
