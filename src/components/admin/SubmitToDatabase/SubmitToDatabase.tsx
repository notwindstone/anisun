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
    const [status, setStatus] = useState<"success" | "loading" | "none" | "error">("none");
    const [databaseData, setDatabaseData] = useState("");

    const isMALIDLessThanAnilibriaID = Number(MALData) < Number(anilibriaData);

    return (
        <>
            <p className={`px-2 py-1 w-fit text-black ${status === "error" ? "bg-red-300 animate-pulse text-3xl" : "bg-neutral-300"}`}>
                {status}
            </p>
            <div className="flex gap-2 items-end flex-wrap">
                <div className="flex flex-col gap-2">
                    <div className="text-lg">
                        MAL ID
                    </div>
                    <input
                        className={`focus:outline-none p-2 bg-white border border-black rounded-md text-black ${isMALIDLessThanAnilibriaID && "ring-2 ring-red-300"}`}
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
                        className={`focus:outline-none p-2 bg-white border border-black rounded-md text-black ${isMALIDLessThanAnilibriaID && "ring-2 ring-red-300"}`}
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
                        disabled={status === "loading"}
                        onClick={async () => {
                            if (status === "loading") {
                                return;
                            }

                            setStatus("none");

                            const result = await writeToAnilibriaSyncDB({
                                idMal:       Number(MALData),
                                idAnilibria: Number(anilibriaData),
                                accessToken,
                                tokenProvider,
                            });
                            const data = await getAnilibriaSyncDB({
                                accessToken,
                                tokenProvider,
                            });

                            setDatabaseData(JSON.stringify(data));
                            setStatus(result === "Success"
                                ? "success"
                                : "error");

                            if (result === "Success") {
                                setMALData("");
                                setAnilibriaData("");
                            }
                        }}
                    >
                        Submit
                    </button>
                    <button
                        className="p-2 bg-white border border-black rounded-md text-black hover:cursor-pointer active:cursor-default disabled:cursor-not-allowed"
                        disabled={status === "loading"}
                        onClick={async () => {
                            if (status === "loading") {
                                return;
                            }

                            setStatus("loading");

                            const result = await writeToAnilibriaSyncDB({
                                idMal:       Number(MALData),
                                idAnilibria: Number(anilibriaData),
                                isRemove:    true,
                                accessToken,
                                tokenProvider,
                            });
                            const data = await getAnilibriaSyncDB({
                                accessToken,
                                tokenProvider,
                            });

                            setDatabaseData(JSON.stringify(data));
                            setStatus(result === "Success"
                                ? "success"
                                : "error");

                            if (result === "Success") {
                                setMALData("");
                                setAnilibriaData("");
                            }
                        }}
                    >
                        Remove
                    </button>
                    <button
                        className="p-2 bg-white border border-black rounded-md text-black hover:cursor-pointer active:cursor-default disabled:cursor-not-allowed"
                        disabled={status === "loading"}
                        onClick={async () => {
                            if (status === "loading") {
                                return;
                            }

                            setStatus("loading");

                            const data = await getAnilibriaSyncDB({
                                accessToken,
                                tokenProvider,
                            });

                            setDatabaseData(JSON.stringify(data));
                            setStatus("success");
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
