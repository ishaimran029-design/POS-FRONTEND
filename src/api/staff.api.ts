import axios from "../service/api";
import type { StaffMember, CreateStaffInput } from "../pages/store-admin/staff-management/types/staff.types";

export const fetchStaffMembers = () => {
    return axios.get<StaffMember[]>("/staff");
};

export const createStaffMember = (data: CreateStaffInput) => {
    const payload = {
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
        ...(data.role === "CASHIER" && { assignedTerminalIds: Array.isArray(data.assignedTerminalIds) ? data.assignedTerminalIds : [] }),
    };
    return axios.post<StaffMember>("/staff", payload);
};

export const updateStaffMember = (id: string, data: Partial<CreateStaffInput>) => {
    return axios.patch<StaffMember>(`/staff/${id}`, data);
};

export const deleteStaffMember = (id: string) => {
    return axios.delete(`/staff/${id}`);
};
