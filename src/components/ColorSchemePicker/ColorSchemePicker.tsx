import {ColorPicker} from "@mantine/core";
import {useState} from "react";

export default function ColorSchemePicker() {
    const [color, onChange] = useState('#000000');

    return (
        <ColorPicker format="rgba" value={color} onChange={onChange} />
    )
}