import { useState } from "react";

const step = 5;

export default function RangedSlider() {
    const [current, setCurrent] = useState<{
        min: number;
        max: number;
    }>({
        min: 0,
        max: 100,
    });
    const [minimal, setMinimal] = useState<number>(current.min);
    const [maximal, setMaximal] = useState<number>(current.max);

    const handleMinimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const newValue = Math.min(
            Number(event.target.value),
            maximal - step,
        );

        setMinimal(newValue);
        setCurrent((state) => ({
            ...state,
            min: newValue,
        }));
    };

    const handleMinimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const newValue = Math.max(
            Number(event.target.value),
            minimal + step,
        );

        setMinimal(newValue);
        setCurrent((state) => ({
            ...state,
            min: newValue,
        }));
    };

    return (
        <></>
    );
}
