export default function DeviceStatusBadge({ status }: { status: "online" | "offline" }) {
    if (status === "online") {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">
                Online
            </span>
        )
    }

    return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-700">
            Offline
        </span>
    )
}
