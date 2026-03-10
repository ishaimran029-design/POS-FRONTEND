import { X, User, Mail, Shield, Lock, Monitor } from 'lucide-react';
import type { CreateStaffInput } from '../../pages/store-admin/staff-management/types/staff.types';
import { useState, useEffect } from 'react';
import { terminalsApi } from '../../service/api';

interface Terminal {
    id: string;
    deviceName: string;
}

interface AddStaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: CreateStaffInput) => Promise<{ success: boolean; error?: string }>;
}

const PASSWORD_HINT = '8+ chars, uppercase, lowercase, digit, special character';

export default function AddStaffModal({ isOpen, onClose, onAdd }: AddStaffModalProps) {
    const [formData, setFormData] = useState<CreateStaffInput>({
        name: '',
        email: '',
        role: 'CASHIER',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [terminals, setTerminals] = useState<Terminal[]>([]);

    useEffect(() => {
        if (isOpen) {
            setFormData({ name: '', email: '', role: 'CASHIER', password: '' });
            setError(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && formData.role === 'CASHIER') {
            terminalsApi.list()
                .then(res => {
                    const data = res.data?.data;
                    setTerminals(Array.isArray(data) ? data : []);
                })
                .catch(() => setTerminals([]));
        } else {
            setTerminals([]);
        }
    }, [isOpen, formData.role]);

    if (!isOpen) return null;

    const handleClose = () => {
        setError(null);
        setFormData({ name: '', email: '', role: 'CASHIER', password: '' });
        onClose();
    };

    const toggleTerminal = (id: string) => {
        const ids = formData.assignedTerminalIds ?? [];
        const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
        setFormData({ ...formData, assignedTerminalIds: next.length ? next : undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
        if (!passRegex.test(formData.password)) {
            setError('Password must be 8+ chars with uppercase, lowercase, digit, and special character');
            return;
        }
        setLoading(true);
        const result = await onAdd(formData);
        setLoading(false);
        if (result.success) {
            handleClose();
        } else {
            setError(result.error || 'Failed to create staff.');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={handleClose}></div>

            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-fade-in">
                <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Staff</h2>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">Onboard Cashier or Accountant</p>
                    </div>
                    <button onClick={handleClose} type="button" className="p-3 hover:bg-white rounded-2xl text-slate-400 transition-all active:scale-95">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-sm font-medium">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Jane Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    required
                                    type="email"
                                    placeholder="jane.doe@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Role</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                <select
                                    value={formData.role}
                                    onChange={e => {
                                        const role = e.target.value as 'CASHIER' | 'ACCOUNTANT';
                                        setFormData({ ...formData, role, assignedTerminalIds: role === 'ACCOUNTANT' ? undefined : formData.assignedTerminalIds });
                                    }}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black uppercase tracking-widest text-xs appearance-none cursor-pointer"
                                >
                                    <option value="CASHIER">Cashier</option>
                                    <option value="ACCOUNTANT">Accountant</option>
                                </select>
                            </div>
                        </div>

                        {formData.role === 'CASHIER' && (
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                                    <Monitor className="w-4 h-4" /> Assigned Terminals
                                </label>
                                {terminals.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                                        {terminals.map(t => (
                                            <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={(formData.assignedTerminalIds ?? []).includes(t.id)}
                                                    onChange={() => toggleTerminal(t.id)}
                                                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="text-sm font-medium text-slate-700">{t.deviceName}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-amber-600 font-medium p-3 bg-amber-50 border border-amber-100 rounded-2xl">
                                        No terminals registered yet. Add terminals from Devices Management first, then assign this cashier.
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password (required)</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium ml-1">{PASSWORD_HINT}</p>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 bg-blue-600 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Staff'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
