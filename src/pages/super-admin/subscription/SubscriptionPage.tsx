import { useState } from 'react';
import { Zap, Check, Edit3, Trash2 } from 'lucide-react';
import { formatPKR } from '@/utils/format';

interface Plan {
    name: string;
    slug: string;
    price: number;
    description: string;
    features: string[];
    current: boolean;
    popular?: boolean;
    duration: string;
    custom?: boolean;
    students: number;
    staffCapacity: number;
    users?: string;
}

const initialPlans: Plan[] = [
    {
        name: 'Basic',
        slug: 'basic',
        price: 2900,
        description: 'Perfect for small shops and kiosks.',
        features: ['Up to 2 Devices', 'Unlimited Products', 'Basic Reports', 'Email Support'],
        current: false,
        duration: 'monthly',
        students: 50,
        staffCapacity: 10,
    },
    {
        name: 'Professional',
        slug: 'professional',
        price: 7900,
        description: 'Best for growing retail businesses.',
        features: ['Up to 10 Devices', 'Inventory Management', 'Advanced Analytics', 'Priority Support', 'Staff Management'],
        current: true,
        popular: true,
        duration: 'monthly',
        students: 200,
        staffCapacity: 45,
    },
    {
        name: 'Enterprise',
        slug: 'enterprise',
        price: 19900,
        description: 'Full power for large scale operations.',
        features: ['Unlimited Devices', 'Multi-store Support', 'Custom Integrations', '24/7 Dedicated Support', 'API Access'],
        current: false,
        duration: 'monthly',
        students: 999,
        staffCapacity: 200,
    },
];

const getButtonLabel = (plan: Plan) => {
    return plan.current ? 'Current Plan' : 'Select Plan';
};

const getDurationLabel = (duration: string) => {
    if (duration === 'yearly') return '/ year';
    if (duration === 'monthly') return '/ month';
    return `/${duration}`;
};

const SuperAdminSubscriptionPage = () => {
    const [plans, setPlans] = useState<Plan[]>(initialPlans);
    const [customName, setCustomName] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [customPrice, setCustomPrice] = useState('');
    const [customStudents, setCustomStudents] = useState('');
    const [customStaff, setCustomStaff] = useState('');
    const [customUsers, setCustomUsers] = useState('');
    const [editingPlanSlug, setEditingPlanSlug] = useState<string | null>(null);

    const handleActivatePlan = (planName: string) => {
        setPlans((prevPlans) =>
            prevPlans.map((plan) => ({
                ...plan,
                current: plan.name === planName,
            }))
        );
    };

    const handleEditPlan = (plan: Plan) => {
        if (!plan.custom) return;
        setEditingPlanSlug(plan.slug);
        setCustomName(plan.name);
        setCustomSlug(plan.slug);
        setCustomPrice(plan.price.toString());
        setCustomStudents(plan.students.toString());
        setCustomStaff(plan.staffCapacity.toString());
        setCustomUsers(plan.users || '');
    };

    const handleDeletePlan = (planSlug: string) => {
        setPlans((prevPlans) => {
            const remaining = prevPlans.filter((plan) => plan.slug !== planSlug);
            if (!remaining.some((plan) => plan.current) && remaining.length > 0) {
                return remaining.map((plan, index) => ({
                    ...plan,
                    current: index === 0,
                }));
            }
            return remaining;
        });
    };

    const handleCreateCustomPlan = () => {
        const priceValue = Number(customPrice.replace(/[^0-9.]/g, ''));
        const studentsValue = Number(customStudents.replace(/\D/g, ''));
        const staffValue = Number(customStaff.replace(/\D/g, ''));

        if (
            !customName.trim() ||
            !customSlug.trim() ||
            !customPrice.trim() ||
            !customStudents.trim() ||
            !customStaff.trim() ||
            Number.isNaN(priceValue) ||
            Number.isNaN(studentsValue) ||
            Number.isNaN(staffValue)
        ) {
            return;
        }

        const nextPlan: Plan = {
            name: customName.trim(),
            slug: customSlug.trim().toLowerCase().replace(/\s+/g, '-'),
            price: priceValue,
            description: 'Custom subscription package with tailored limits.',
            features: ['Dedicated onboarding', 'Flexible limits', 'Priority support'],
            current: false,
            duration: 'monthly',
            custom: true,
            students: studentsValue,
            staffCapacity: staffValue,
            users: customUsers.trim() || undefined,
        };

        setPlans((prevPlans) => {
            if (editingPlanSlug) {
                return prevPlans.map((plan) =>
                    plan.slug === editingPlanSlug ? { ...plan, ...nextPlan } : plan
                );
            }
            return [...prevPlans, nextPlan];
        });

        setEditingPlanSlug(null);
        setCustomName('');
        setCustomSlug('');
        setCustomPrice('');
        setCustomStudents('');
        setCustomStaff('');
        setCustomUsers('');
    };

    return (
        <div className="animate-fade-in space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Subscription Plan Page</h1>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Show current active plan and available subscription tiers.</p>
                </div>
                <div className="bg-indigo-600/10 border border-indigo-600/20 px-6 py-3 rounded-2xl flex items-center gap-3">
                    <Zap className="text-indigo-600" size={20} />
                    <div>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Active Plan</p>
                        <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200">{plans.find((plan) => plan.current)?.name || 'Professional'}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.slug}
                        className={`min-h-[620px] h-full flex flex-col rounded-[32px] p-8 transition-all ${plan.current ? 'border border-indigo-500/40 bg-indigo-50/80 shadow-[0_20px_60px_-25px_rgba(99,102,241,0.6)] dark:bg-slate-900 dark:border-indigo-400' : 'border border-slate-200 bg-white shadow-sm hover:shadow-md dark:bg-slate-950 dark:border-slate-700'}`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">{plan.name}</p>
                                <h3 className="mt-5 text-4xl font-black text-slate-900 dark:text-slate-100">{formatPKR(plan.price)}</h3>
                                <p className="text-sm font-bold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 mt-2">{getDurationLabel(plan.duration)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={!plan.custom}
                                    onClick={() => handleEditPlan(plan)}
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${plan.custom ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700' : 'bg-slate-100/50 text-slate-400 cursor-not-allowed dark:bg-slate-900/50 dark:text-slate-500'}`}
                                >
                                    <Edit3 size={16} />
                                </button>
                                <button
                                    type="button"
                                    disabled={!plan.custom}
                                    onClick={() => plan.custom && handleDeletePlan(plan.slug)}
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${plan.custom ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700' : 'bg-slate-100/50 text-slate-400 cursor-not-allowed dark:bg-slate-900/50 dark:text-slate-500'}`}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Core Limits</p>
                            <div className="mt-4 grid gap-3">
                                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Categories</p>
                                    <p className="mt-2 text-lg font-black text-slate-900 dark:text-slate-100">{plan.students}</p>
                                </div>
                                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Staff Capacity</p>
                                    <p className="mt-2 text-lg font-black text-slate-900 dark:text-slate-100">{plan.staffCapacity}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grow">
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Included Features</p>
                            <ul className="mt-4 space-y-3">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 dark:bg-emerald-500/10">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={() => !plan.current && handleActivatePlan(plan.name)}
                            disabled={plan.current}
                            className={`mt-8 w-full rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest transition-all ${plan.current ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                        >
                            {getButtonLabel(plan)}
                        </button>
                    </div>
                ))}

                <div className="min-h-[620px] h-full rounded-[32px] border border-dashed border-slate-300 bg-white p-8 shadow-sm dark:border-slate-600 dark:bg-slate-950 flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">Create Custom Plan</p>
                        <h2 className="mt-5 text-2xl font-black text-slate-900 dark:text-slate-100">Custom Plan</h2>
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Add a tailored plan with categories and staff capacity limits.</p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <label className="block text-sm text-slate-600 dark:text-slate-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Plan Name</span>
                                <input
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    placeholder="Custom Growth Plan"
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Slug</span>
                                <input
                                    value={customSlug}
                                    onChange={(e) => setCustomSlug(e.target.value)}
                                    placeholder="custom-growth"
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Price (PKR)</span>
                                <input
                                    value={customPrice}
                                    onChange={(e) => setCustomPrice(e.target.value)}
                                    placeholder="5000"
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Categories limit</span>
                                <input
                                    value={customStudents}
                                    onChange={(e) => setCustomStudents(e.target.value)}
                                    placeholder="250"
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Staff Capacity</span>
                                <input
                                    value={customStaff}
                                    onChange={(e) => setCustomStaff(e.target.value)}
                                    placeholder="50"
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Users (optional)</span>
                                <input
                                    value={customUsers}
                                    onChange={(e) => setCustomUsers(e.target.value)}
                                    placeholder="Admins, managers, etc."
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateCustomPlan}
                        className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-indigo-700"
                    >
                        {editingPlanSlug ? 'Update Custom Plan' : 'Save Custom Plan'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSubscriptionPage;