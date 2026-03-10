import { useEffect, useState } from "react"
import { fetchDevices, registerDevice, updateDevice, deleteDevice } from "@/api/devices.api"
import type { Device } from "../types/device.types"

// Function to map backend device to frontend type
const mapDevice = (d: any): Device => ({
    id: d.id,
    name: d.deviceName,
    serialNumber: d.serialNumber,
    type: d.deviceType,
    status: d.isActive ? "online" : "offline",
    lastHeartbeat: d.lastActiveAt ? `${new Date(d.lastActiveAt).toLocaleString()}` : "Never",
    ipAddress: d.ipAddress || "0.0.0.0",
    scanner: d.scannerType || "None"
});

export const useDevicesData = () => {
    const [devices, setDevices] = useState<Device[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const limit = 10

    useEffect(() => {
        loadDevices()
    }, [])

    const loadDevices = async () => {
        setLoading(true)
        try {
            const res = await fetchDevices()
            if (res.data.success && Array.isArray(res.data.data)) {
                setDevices(res.data.data.map(mapDevice))
            } else {
                setDevices(MOCK_DEVICES)
            }
        } catch (error) {
            console.error("Failed to fetch devices, using mock data:", error)
            setDevices(MOCK_DEVICES)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (data: any) => {
        setLoading(true)
        try {
            const res = await registerDevice(data)
            if (res.data.success) {
                await loadDevices()
                return true
            }
            return false
        } catch (error) {
            console.error("Failed to register device:", error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (id: string, data: any) => {
        setLoading(true)
        try {
            const res = await updateDevice(id, data)
            if (res.data.success) {
                await loadDevices()
                return true
            }
            return false
        } catch (error) {
            console.error("Failed to update device:", error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setLoading(true)
        try {
            const res = await deleteDevice(id)
            if (res.data.success) {
                await loadDevices()
                return true
            }
            return false
        } catch (error) {
            console.error("Failed to delete device:", error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const paginated = devices.slice((page - 1) * limit, page * limit)

    return {
        devices,
        paginated,
        loading,
        page,
        setPage,
        total: devices.length,
        loadDevices,
        handleRegister,
        handleUpdate,
        handleDelete
    }
}

const MOCK_DEVICES: Device[] = [
    {
        id: "1",
        name: "Main Counter POS",
        serialNumber: "SN-POS-001",
        type: "POS Terminal",
        status: "online",
        lastHeartbeat: "5 seconds ago",
        ipAddress: "192.168.1.10",
        scanner: "USB"
    },
    {
        id: "2",
        name: "Delivery Tablet",
        serialNumber: "SN-TAB-042",
        type: "Tablet",
        status: "online",
        lastHeartbeat: "12 minutes ago",
        ipAddress: "192.168.1.15",
        scanner: "Bluetooth"
    },
    {
        id: "3",
        name: "Kitchen Display",
        serialNumber: "SN-KDS-102",
        type: "KDS",
        status: "offline",
        lastHeartbeat: "2 days ago",
        ipAddress: "192.168.1.20",
        scanner: "None"
    },
    {
        id: "4",
        name: "Staff Handheld",
        serialNumber: "SN-HND-501",
        type: "Handheld",
        status: "online",
        lastHeartbeat: "1 minute ago",
        ipAddress: "192.168.1.25",
        scanner: "Bluetooth"
    }
]
