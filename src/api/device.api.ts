import api from "./api";

/**
 * Register a new device
 */
export const registerDevice = (data: any) => {
    return api.post("/devices", data);
};

/**
 * Fetch all stores for assignment
 */
export const fetchStores = () => {
    return api.get("/stores");
};
