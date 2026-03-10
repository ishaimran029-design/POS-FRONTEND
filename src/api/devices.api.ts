import api from "./api"

export const fetchDevices = () => {
    return api.get("/devices")
}

export const fetchActiveDevices = () => {
    return api.get("/devices")
}

export const registerDevice = (data: any) => {
    return api.post("/devices", data)
}

export const updateDevice = (id: string, data: any) => {
    return api.patch(`/devices/${id}`, data)
}

export const deleteDevice = (id: string) => {
    return api.delete(`/devices/${id}`)
}
