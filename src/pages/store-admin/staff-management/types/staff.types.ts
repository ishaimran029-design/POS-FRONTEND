export type StaffRole = "Manager" | "Cashier" | "Accountant" | "Admin";
export type StaffStatus = "active" | "inactive";

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: StaffRole;
    status: StaffStatus;
    lastLogin: string;
}

export interface CreateStaffInput {
    name: string;
    email: string;
    role: StaffRole;
    password?: string;
    status: StaffStatus;
}
