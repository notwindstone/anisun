export default function simpleHash(input: string) {
    let hash: number = 0;

    for (let index = 0; index < input.length; index++) {
        hash = Math.imul(31, hash) + (input.codePointAt(index) ?? 0);
    }

    return hash;
}
