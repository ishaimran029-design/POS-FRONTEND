import axios from "../service/api";
import type { StaffMember, CreateStaffInput } from "../pages/store-admin/staff-management/types/staff.types";

export const fetchStaffMembers = () => {
    return axios.get<StaffMember[]>("/users");
};

export const fetchStaffMemberById = (id: string) => {
    return axios.get(`/users/${id}`);
};

export const createStaffMember = (data: CreateStaffInput) => {
    const payload = {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
        ...(data.role === "CASHIER" && { assignedTerminalIds: Array.isArray(data.assignedTerminalIds) ? data.assignedTerminalIds : [] }),
    };
    return axios.post<StaffMember>("/users", payload);
};

export const updateStaffMember = (id: string, data: any) => {
    return axios.patch<StaffMember>(`/users/${id}`, data);
};

export const deleteStaffMember = (id: string) => {
    return axios.delete(`/users/${id}`);
};
