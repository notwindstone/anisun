export default function getShikimoriId(code: string) {
    // code format is "12345-word-word-word", sometimes with a letter at the beginning
    return code.split('-')[0].replace(/\D/g, '')
}