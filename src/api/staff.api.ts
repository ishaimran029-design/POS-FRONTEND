import api from "./api";
import type { CreateStaffInput } from "../pages/store-admin/staff-management/types/staff.types";

/**
 * HR Staff APIs (/staff)
 */
export const fetchStaffHR = async () => {
    return api.get("/staff").then(res => res.data);
};

export const fetchStaffSummary = async () => {
    return api.get("/staff/summary").then(res => res.data);
};

/**
 * System User APIs (/users) 
 * (In a Hybrid system, we fetch these to link with HR records)
 */
export const fetchSystemUsers = async () => {
    return api.get("/users").then(res => res.data);
};

export const createUnifiedStaff = async (data: CreateStaffInput) => {
    // 1. Always create the HR record
    const hrPayload = {
        name: data.name,
        phone: data.phone,
        role: data.role,
        monthlySalary: data.monthlySalary,
        joiningDate: data.joiningDate,
    };
    
    const staffResponse = await api.post("/staff", hrPayload);
    
    // 2. Conditionally create the Login Access (System User)
    if (data.enableLogin && data.email && data.password) {
        const userPayload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.systemRole || "CASHIER",
            assignedTerminalIds: data.assignedTerminalIds || [],
        };
        await api.post("/users", userPayload);
    }
    
    return staffResponse.data;
};

export const updateUnifiedStaff = async (id: string, data: CreateStaffInput, userId?: string) => {
    // 1. Update the HR record
    const hrPayload = {
        name: data.name,
        phone: data.phone,
        role: data.role,
        monthlySalary: data.monthlySalary,
        joiningDate: data.joiningDate,
    };
    
    const staffResponse = await api.put(`/staff/${id}`, hrPayload);
    
    // 2. Handle System Access Update
    if (data.enableLogin && userId) {
        // Update existing user
        const userPayload: any = {
            name: data.name,
            email: data.email,
            role: data.systemRole || "CASHIER",
            assignedTerminalIds: data.assignedTerminalIds || [],
        };
        // Update password only if provided
        if (data.password) {
            userPayload.password = data.password;
        }
        await api.put(`/users/${userId}`, userPayload);
    } else if (data.enableLogin && !userId && data.email && data.password) {
        // Create new user for existing staff
        const userPayload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.systemRole || "CASHIER",
            assignedTerminalIds: data.assignedTerminalIds || [],
        };
        await api.post("/users", userPayload);
    }
    
    return staffResponse.data;
};

export const deleteStaffMember = (id: string) => {
    return api.delete(`/staff/${id}`).then(res => res.data);
};

