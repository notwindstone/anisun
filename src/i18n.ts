import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import locales from '@/configs/locales.json';

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    // eslint-disable-next-line
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});