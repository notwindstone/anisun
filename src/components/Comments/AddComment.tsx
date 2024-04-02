import {useRef} from "react";
import {Textarea} from "@mantine/core";

export default function AddComment() {
    const ref = useRef<HTMLTextAreaElement>(null);

    return (
        <Textarea
          ref={ref}
          placeholder="Autosize with no rows limit"
          label="Autosize with no rows limit"
          autosize
          minRows={2}
        />
    )
}