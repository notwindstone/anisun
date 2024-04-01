import React from 'react';

export default async function Page({ params }: { params: { code: string } }) {
    return (
        <>
            <div>{params.code}</div>
        </>
    );
}