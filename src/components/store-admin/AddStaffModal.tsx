import { X, User, Mail, Shield, Lock, Eye, EyeOff, Calculator, Calendar, Phone, Fingerprint } from 'lucide-react';
import type { UnifiedStaffMember, CreateStaffInput, UserRole } from '../../pages/store-admin/staff-management/types/staff.types';
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
    editMember?: UnifiedStaffMember;
    onEdit?: (id: string, data: any) => Promise<{ success: boolean; error?: string }>;
}

export default function AddStaffModal({ isOpen, onClose, onAdd, editMember, onEdit }: AddStaffModalProps) {
    const [formData, setFormData] = useState<CreateStaffInput>({
        name: '',
        phone: '',
        role: 'CASHIER',
        monthlySalary: 0,
        joiningDate: new Date().toISOString().split('T')[0],
        enableLogin: false,
        email: '',
        password: '',
        systemRole: 'CASHIER' as UserRole,
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [terminals, setTerminals] = useState<Terminal[]>([]);

    useEffect(() => {
        if (isOpen) {
            if (editMember) {
                setFormData({
                    name: editMember.name,
                    phone: editMember.phone || '',
                    role: editMember.hrRole,
                    monthlySalary: editMember.monthlySalary,
                    joiningDate: editMember.joiningDate ? new Date(editMember.joiningDate).toISOString().split('T')[0] : '',
                    enableLogin: !!editMember.userId,
                    email: editMember.email || '',
                    password: '',
                    systemRole: editMember.systemRole || 'CASHIER',
                    assignedTerminalIds: editMember.assignedTerminals?.map(t => t.id)
                });
            } else {
                setFormData({
                    name: '',
                    phone: '',
                    role: 'CASHIER',
                    monthlySalary: 0,
                    joiningDate: new Date().toISOString().split('T')[0],
                    enableLogin: false,
                    email: '',
                    password: '',
                    systemRole: 'CASHIER',
                });
            }
            setError(null);
            setShowPassword(false);
        }
    }, [isOpen, editMember]);

    useEffect(() => {
        if (isOpen && formData.enableLogin && formData.systemRole === 'CASHIER') {
            terminalsApi.list()
                .then(res => {
                    const data = res.data?.data;
                    setTerminals(Array.isArray(data) ? data : []);
                })
                .catch(() => setTerminals([]));
        }
    }, [isOpen, formData.enableLogin, formData.systemRole]);

    if (!isOpen) return null;

    const handleClose = () => {
        setError(null);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation for login enabled
        if (formData.enableLogin && !editMember) {
            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
            if (!passRegex.test(formData.password || '')) {
                setError('Password must be 8+ chars with uppercase, lowercase, digit, and special character');
                return;
            }
        }

        setLoading(true);
        const result = editMember && onEdit 
            ? await onEdit(editMember.id, formData) 
            : await onAdd(formData);
        setLoading(false);

        if (result.success) {
            handleClose();
        } else {
            setError(result.error || `Failed to save employment record.`);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={handleClose}></div>
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up theme-transition">
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{editMember ? 'Modify Personnel' : 'Onboard Employee'}</h2>
                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{editMember ? 'Updating Integrated HR + SYSTEM access' : 'Integrated HR + SYSTEM Provisioning'}</p>
                    </div>
                    <button onClick={handleClose} type="button" className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 transition-all active:scale-95">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
                    {error && (
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-[11px] font-black uppercase tracking-wider animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* ─── HR Section ─── */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4 flex items-center gap-2">
                                <Fingerprint className="w-4 h-4" /> Personal & HR Data
                            </h3>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Legal Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-bold text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        placeholder="+92 3XX XXXXXXX"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-bold text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Monthly Salary</label>
                                    <div className="relative">
                                        <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            required
                                            type="number"
                                            placeholder="₨ 0.00"
                                            value={formData.monthlySalary}
                                            onChange={e => setFormData({ ...formData, monthlySalary: Number(e.target.value) })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-bold text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Joining Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            required
                                            type="date"
                                            value={formData.joiningDate}
                                            onChange={e => setFormData({ ...formData, joiningDate: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-bold text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── System Auth Section ─── */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> System Access
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase text-slate-400">Enable</span>
                                    <input 
                                        type="checkbox"
                                        checked={formData.enableLogin}
                                        onChange={e => setFormData({...formData, enableLogin: e.target.checked})}
                                        className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className={`space-y-6 transition-all duration-500 ${formData.enableLogin ? 'opacity-100' : 'opacity-30 pointer-events-none grayscale select-none'}`}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Login Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            required={formData.enableLogin}
                                            type="email"
                                            placeholder="System Login ID"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            required={formData.enableLogin && !editMember}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-900 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white rounded-xl text-slate-400 transition-all active:scale-95"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">System Role</label>
                                    <select
                                        value={formData.systemRole}
                                        onChange={e => setFormData({ ...formData, systemRole: e.target.value as UserRole })}
                                        className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-black uppercase tracking-widest text-[10px] appearance-none cursor-pointer text-slate-900 dark:text-white"
                                    >
                                        <option value="CASHIER">Cashier Access</option>
                                        <option value="ACCOUNTANT">Accountant Access</option>
                                        <option value="STORE_ADMIN">Store Admin Access</option>
                                    </select>
                                </div>

                                {formData.systemRole === 'CASHIER' && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Default Terminal</label>
                                        <select
                                            value={formData.assignedTerminalIds?.[0] || ""}
                                            onChange={e => {
                                                const val = e.target.value;
                                                setFormData({ ...formData, assignedTerminalIds: val ? [val] : undefined });
                                            }}
                                            className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-black uppercase tracking-widest text-[10px] appearance-none cursor-pointer text-slate-900 dark:text-white"
                                        >
                                            <option value="">Auto-Detect Device</option>
                                            {terminals.map(t => (
                                                <option key={t.id} value={t.id}>{t.deviceName}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Abort
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-900/10 hover:bg-slate-800 active:scale-95 disabled:opacity-50 transition-all"
                        >
                            {loading ? (editMember ? 'Syncing...' : 'Deploying...') : (editMember ? 'Confirm Updates' : 'Complete Onboarding')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

