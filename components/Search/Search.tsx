'use client';

import { useState } from 'react';
import { Autocomplete } from '@mantine/core';

export function Search() {
    const [query, setQuery] = useState('');

    const data = [];
    const onChange = async (e) => {
        const value = e.key;
        console.log(e, e.key)
        setQuery(value);

        if (value.length > 3) {
            const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${value}&limit=5`);
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
