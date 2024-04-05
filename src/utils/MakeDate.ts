export function MakeDate(createdAt: string) {
    const parsedDate = Date.parse(createdAt)
    const createdDate = new Date(parsedDate)
    const localDate = createdDate.toLocaleDateString()
    const localTime = createdDate.toLocaleTimeString()
    return (`${localTime}, ${localDate} `)
}