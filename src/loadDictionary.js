export default async function loadDictionary(locale) {
    const translations = await import(`../public/locales/${locale}.json`);

    return translations.default;
}