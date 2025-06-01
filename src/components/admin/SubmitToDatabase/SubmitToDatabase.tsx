"use client";

import { useState } from "react";
import { getAnilibriaSyncDB, writeToAnilibriaSyncDB } from "@/lib/actions/admin";

export default function SubmitToDatabase({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: string;
}) {
    const [MALData, setMALData] = useState("");
    const [anilibriaData, setAnilibriaData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [databaseData, setDatabaseData] = useState("");

    return (
        <>
            <div className="flex gap-2 items-end flex-wrap">
                <div className="flex flex-col gap-2">
                    <div className="text-lg">
                        MAL ID
                    </div>
                    <input
                        className="p-2 bg-white border border-black rounded-md text-black"
                        value={MALData}
                        onChange={(event) => {
                            const value = Number(event?.target?.value);

                            if (Number.isNaN(value)) {
                                setMALData(MALData);

                                return;
                            }

                            setMALData(
                                value.toString(),
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-lg">
                        Anilibria ID
                    </div>
                    <input
                        className="p-2 bg-white border border-black rounded-md text-black"
                        value={anilibriaData}
                        onChange={(event) => {
                            const value = Number(event?.target?.value);

                            if (Number.isNaN(value)) {
                                setAnilibriaData(anilibriaData);

                                return;
                            }

                            setAnilibriaData(
                                value.toString(),
                            );
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        className="p-2 bg-white border border-black rounded-md text-black hover:cursor-pointer active:cursor-default disabled:cursor-not-allowed"
                        disabled={isLoading}
                        onClick={async () => {
                            if (isLoading) {
                                return;
                            }

                            setIsLoading(true);

                            const result = await writeToAnilibriaSyncDB({
                                idMal:       Number(MALData),
                                idAnilibria: Number(anilibriaData),
                                accessToken,
                                tokenProvider,
                            });

                            alert(result);
                            setIsLoading(false);
                        }}
                    >
                        Submit
                    </button>
                    <button
                        className="p-2 bg-white border border-black rounded-md text-black hover:cursor-pointer active:cursor-default disabled:cursor-not-allowed"
                        disabled={isLoading}
                        onClick={async () => {
                            if (isLoading) {
                                return;
                            }

                            setIsLoading(true);

                            const result = await writeToAnilibriaSyncDB({
                                idMal:       Number(MALData),
                                idAnilibria: Number(anilibriaData),
                                isRemove:    true,
                                accessToken,
                                tokenProvider,
                            });

                            alert(result);
                            setIsLoading(false);
                        }}
                    >
                        Remove
                    </button>
                    <button
                        className="p-2 bg-white border border-black rounded-md text-black hover:cursor-pointer active:cursor-default disabled:cursor-not-allowed"
                        disabled={isLoading}
                        onClick={async () => {
                            const data = await getAnilibriaSyncDB({
                                accessToken,
                                tokenProvider,
                            });

                            setDatabaseData(JSON.stringify(data));
                        }}
                    >
                        Refetch
                    </button>
                </div>
            </div>
            <div>
                {databaseData}
            </div>
        </>
    );
}
