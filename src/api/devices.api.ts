import api from "./api"

/**
 * Device-related API Integration
 */

export const fetchDevices = (storeId?: string) => {
    return api.get(storeId ? `/devices?storeId=${storeId}` : "/devices").then(res => res.data)
}

export const fetchActiveDevices = () => {
    return api.get("/devices").then(res => res.data)
}

/**
 * Register a new device
 */
export const registerDevice = (data: any) => {
    return api.post("/devices", data).then(res => res.data)
}

/**
 * Fetch all stores for assignment
 */
export const fetchStores = () => {
    return api.get("/stores").then(res => res.data)
}

export const updateDevice = (id: string, data: any) => {
    return api.patch(`/devices/${id}`, data).then(res => res.data)
}

export const deleteDevice = (id: string) => {
    return api.delete(`/devices/${id}`).then(res => res.data)
}

export const heartbeat = (id: string) => {
    return api.patch(`/devices/${id}/heartbeat`).then(res => res.data);
};

export const releaseDevice = () => {
    return api.patch('/devices/release').then(res => res.data);
};

/**
 * Terminal APIs
 */
export const registerTerminal = (data: { terminalName: string; deviceFingerprint: string }) =>
    api.post('/terminals/register', data).then(res => res.data);

export const listTerminals = () => api.get('/terminals').then(res => res.data);

export const checkTerminal = (fingerprint: string) => 
    api.get(`/terminals/check?fingerprint=${encodeURIComponent(fingerprint)}`).then(res => res.data);

export const assignCashier = (terminalId: string, userId: string) =>
    api.post(`/terminals/${terminalId}/assign`, { userId }).then(res => res.data);

export const unassignCashier = (terminalId: string, userId: string) =>
    api.delete(`/terminals/${terminalId}/assign/${userId}`).then(res => res.data);

export const listTerminalCashiers = (terminalId: string) => 
    api.get(`/terminals/${terminalId}/cashiers`).then(res => res.data);

