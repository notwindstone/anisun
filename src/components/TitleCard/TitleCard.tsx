import {Box} from "@mantine/core";

export default function TitleCard({ title }: { title: any }) {
    return (
        <>
            <Box>
                {title.name}
            </Box>
        </>
    )
}