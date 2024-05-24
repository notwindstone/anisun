/*
 * My IDE can't handle it
 *
 * type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
 * type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
 * type Part = Letter | Digit;
 *
 * type CodeShort = `${Part}${Part}${Part}`;
 * type CodeDefault = `${Part}${Part}${Part}`;
 * type CodeWithAlpha = `${CodeDefault}${Part}`;
 * type CodeAny = CodeShort | CodeDefault | CodeWithAlpha
 *
 * export type HEX = `#${CodeAny}`
 */

export type HEX = `#${string}`;