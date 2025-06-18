import HistoryWrapper from "@/components/misc/HistoryWrapper/HistoryWrapper";

export default async function Page() {
    return (
        <div className="flex flex-col p-4 gap-4 mx-auto max-w-384">
            <p>
                your history. only 2000 items will be shown
            </p>
            <HistoryWrapper />
        </div>
    );
}
