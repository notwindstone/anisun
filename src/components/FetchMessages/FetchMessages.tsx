"use client";

export default function FetchMessages() {
    return (
        <button onClick={async () => {
            const t1 = performance.now();
            const response = await fetch('http://localhost:3001/api/message/2314');

            if (!response.ok) {
                alert("bruh");
            }

            const t2 = performance.now();
            const data = await response.json();
            const t3 = performance.now();

            alert(JSON.stringify({
                ...data,
                time: t2 - t1,
                bodyTime: t3 - t2,
                overall: t3 - t1,
            }));
        }}>
            suck?
        </button>
    );
}