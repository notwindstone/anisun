import {AspectRatio} from "@mantine/core";

export default function SovetRomantica({ id }: { id: string }) {
    console.log(id);

    return (
        <AspectRatio ratio={16 / 9}>

        </AspectRatio>
    );
}