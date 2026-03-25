import api from "./api"

/**
 * Device-related API Integration
 */

export const fetchDevices = (storeId?: string) => {
    return api.get(storeId ? `/devices?storeId=${storeId}` : "/devices")
}

export const fetchActiveDevices = () => {
    return api.get("/devices")
}

/**
 * Register a new device
 */
export const registerDevice = (data: any) => {
    return api.post("/devices", data)
}

/**
 * Fetch all stores for assignment
 */
export const fetchStores = () => {
    return api.get("/stores")
}

export const updateDevice = (id: string, data: any) => {
    return api.patch(`/devices/${id}`, data)
}

export const deleteDevice = (id: string) => {
    return api.delete(`/devices/${id}`)
}

export const heartbeat = (id: string) => {
    return api.patch(`/devices/${id}/heartbeat`);
};

export const releaseDevice = () => {
    return api.patch('/devices/release');
};

/**
 * Terminal APIs
 */
export const registerTerminal = (data: { terminalName: string; deviceFingerprint: string }) =>
    api.post('/terminals/register', data);

export const listTerminals = () => api.get('/terminals');

export const checkTerminal = (fingerprint: string) => 
    api.get(`/terminals/check?fingerprint=${encodeURIComponent(fingerprint)}`);

export const assignCashier = (terminalId: string, userId: string) =>
    api.post(`/terminals/${terminalId}/assign`, { userId });

export const unassignCashier = (terminalId: string, userId: string) =>
    api.delete(`/terminals/${terminalId}/assign/${userId}`);

export const listTerminalCashiers = (terminalId: string) => 
    api.get(`/terminals/${terminalId}/cashiers`);

