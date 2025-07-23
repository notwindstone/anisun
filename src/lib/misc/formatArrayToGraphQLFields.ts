type ShittyNode = {
    children: Record<string, ShittyNode>;
};

export default function formatArrayToGraphQLFields(entries: string[]) {
    const root: ShittyNode = { children: {} };

    for (const entry of entries) {
        const parts = entry.split(".");
        let currentNode = root;

        for (const part of parts) {
            if (currentNode.children[part] === undefined) {
                currentNode.children[part] = { children: {} };
            }

            currentNode = currentNode.children[part];
        }
    }

    function generateString(nodeChildren: Record<string, ShittyNode>) {
        const parts: Array<string> = [];
        const nodeChildrenKeys = Object.keys(nodeChildren);

        for (const key of nodeChildrenKeys) {
            const childNode = nodeChildren[key];

            if (Object.keys(childNode.children).length === 0) {
                parts.push(key);

                continue;
            }

            const inner = generateString(childNode.children);

            parts.push(`${key} {${inner}}`);
        }

        return parts.join(" ");
    }

    return generateString(root.children);
}
