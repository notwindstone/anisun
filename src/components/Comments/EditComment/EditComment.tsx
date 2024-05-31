import {useUser} from "@clerk/nextjs";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon} from "@mantine/core";
import {IconEdit} from "@tabler/icons-react";

export function EditComment({ userid, sendEdit }: { userid: string, sendEdit: (isEditing: boolean) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [isEditing, { toggle }] = useDisclosure(false);

    const isUser = isLoaded && isSignedIn;

    if (!isUser || userid !== user?.id) {
        return;
    }

    const handleEdit = () => {
        toggle();
        sendEdit(!isEditing);
    };

    return (
        <ActionIcon variant="default" onClick={() => handleEdit()}>
            <IconEdit size={20} stroke={1.5} />
        </ActionIcon>
    );
}