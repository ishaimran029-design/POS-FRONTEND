// Backend UserRole enum: SUPER_ADMIN | STORE_ADMIN | CASHIER | ACCOUNTANT
export type UserRole = "SUPER_ADMIN" | "STORE_ADMIN" | "CASHIER" | "ACCOUNTANT";

// Backend StaffRole enum (HR)
export type StaffRole = 
    | "MANAGER" 
    | "SUPERVISOR" 
    | "CASHIER" 
    | "SALES_ASSOCIATE" 
    | "ACCOUNTANT" 
    | "INVENTORY_CLERK" 
    | "SECURITY" 
    | "CLEANER" 
    | "DRIVER" 
    | "OTHER";

export type StaffStatus = "ACTIVE" | "INACTIVE";

/**
 * UnifiedStaffMember represents the merged data from:
 * 1. User table (Authentication/System Access)
 * 2. StaffMember table (HR/Payroll)
 */
export interface UnifiedStaffMember {
    // Shared / Identification
    id: string; // The primary ID (usually from StaffMember table or User if no HR record)
    name: string;
    phone?: string | null;

    // HR Data (/staff)
    hrId?: string;
    hrRole: StaffRole;
    monthlySalary: number;
    joiningDate: string;
    hrStatus: StaffStatus;

    // System Access Data (/users)
    userId?: string;
    email?: string | null;
    systemRole?: UserRole | null;
    isSystemActive?: boolean;
    lastLogin?: string | null;
    lastLogout?: string | null;
    assignedTerminals?: Array<{ id: string; deviceName: string }>;
}

export interface CreateStaffInput {
    // HR Fields
    name: string;
    phone?: string;
    role: StaffRole;
    monthlySalary: number;
    joiningDate: string;
    
    // Auth Fields (Optional)
    enableLogin: boolean;
    email?: string;
    password?: string;
    systemRole?: UserRole;
    assignedTerminalIds?: string[];
}

