/*
 * 1, 21, 31, ... ответ
 * 2, 3, 4, 22, 23, 24, 32, 33, 34 ... ответа
 * 5, 6, 7, 8, 9, 10-20, 25, 26, 27, 28, 29, 30, ... ответов
 */
export function makeWordEnding(replies: number) {
    const twoToFour = [2, 3, 4]
    const tenToTwenty = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    // 1, 21, 31, ...
    const firstCase =
        replies % 10 === 1 &&
        replies !== 11

    if (firstCase) {
        return 'ответ'
    }

    // 2, 3, 4, 22, 23, 24, 32, 33, 34, ...
    const secondCase =
        twoToFour.includes(replies % 10) &&
        !tenToTwenty.includes(replies)

    if (secondCase) {
        return 'ответа'
    }

    // 5, 6, 7, 8, 9, 10-20, 25, 26, 27, 28, 29, 30
    return 'ответов'
}