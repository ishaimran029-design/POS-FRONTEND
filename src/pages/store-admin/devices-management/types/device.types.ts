export interface Device {
    id: string
    name: string
    serialNumber: string
    type: string
    status: "online" | "offline"
    lastHeartbeat: string
    ipAddress: string
    scanner: "USB" | "Bluetooth" | "None"
    connectedTo?: string | null
    deviceFingerprint?: string | null
}
