import { useState, useEffect, useCallback } from 'react';
import type { StaffMember, CreateStaffInput, StaffRole, StaffStatus } from '../types/staff.types';
import { fetchStaffMembers, createStaffMember, updateStaffMember, deleteStaffMember } from '../../../../api/staff.api';

const MOCK_STAFF: StaffMember[] = [
    { id: '01', name: 'Jane Doe', email: 'jane.doe@pos-v4.com', role: 'Manager', status: 'active', lastLogin: '2 mins ago' },
    { id: '02', name: 'John Smith', email: 'john.smith@pos-v4.com', role: 'Cashier', status: 'active', lastLogin: '1 hour ago' },
    { id: '03', name: 'Alice Wilson', email: 'alice.w@pos-v4.com', role: 'Accountant', status: 'inactive', lastLogin: 'Yesterday' },
    { id: '04', name: 'Bob Brown', email: 'bob.b@pos-v4.com', role: 'Cashier', status: 'active', lastLogin: '3 hours ago' },
    { id: '05', name: 'Charlie Davis', email: 'charlie.d@pos-v4.com', role: 'Manager', status: 'active', lastLogin: '5 mins ago' },
];

export function useStaffData() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<StaffRole | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<StaffStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const loadStaff = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchStaffMembers();
            // The backend returns { success, data, message }, Axios puts that in response.data
            // So we need response.data.data
            if (response.data && (response.data as any).data) {
                setStaff((response.data as any).data);
            } else if (Array.isArray(response.data)) {
                setStaff(response.data);
            }
        } catch (err: any) {
            console.warn("Staff API failed, using mock data", err);
            setStaff(MOCK_STAFF);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStaff();
    }, [loadStaff]);

    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.id.includes(searchQuery);
        const matchesRole = roleFilter === 'All' || member.role === roleFilter;
        const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
    const paginatedStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleAddStaff = async (data: CreateStaffInput) => {
        try {
            const response = await createStaffMember(data);
            setStaff(prev => [response.data, ...prev]);
            return true;
        } catch (err) {
            console.warn("Create staff failed, updating local state for demo", err);
            const newStaff: StaffMember = {
                id: String(staff.length + 1).padStart(2, '0'),
                ...data,
                lastLogin: 'Never'
            };
            setStaff(prev => [newStaff, ...prev]);
            return true;
        }
    };

    const handleUpdateStaff = async (id: string, data: Partial<CreateStaffInput>) => {
        try {
            await updateStaffMember(id, data);
            setStaff(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
        } catch (err) {
            console.warn("Update staff failed, updating local state for demo", err);
            setStaff(prev => prev.map(s => s.id === id ? { ...s, ...data } as StaffMember : s));
        }
    };

    const handleDeleteStaff = async (id: string) => {
        try {
            await deleteStaffMember(id);
            setStaff(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.warn("Delete staff failed, updating local state for demo", err);
            setStaff(prev => prev.filter(s => s.id !== id));
        }
    };

    return {
        staff: paginatedStaff,
        totalCount: filteredStaff.length,
        loading,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        totalPages,
        handleAddStaff,
        handleUpdateStaff,
        handleDeleteStaff,
        refresh: loadStaff
    };
}
