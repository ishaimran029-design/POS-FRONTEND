import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Settings,
    Monitor,
    ClipboardList,
    ChevronRight,
    LogOut,
    Store
} from "lucide-react";

const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Stores", icon: Store, path: "/admin/stores" },
    { name: "Global Admins", icon: Users, path: "/admin/admins" },
    { name: "Manage Devices", icon: Monitor, path: "/admin/devices" },
    { name: "Audit Logs", icon: ClipboardList, path: "/admin/logs" },
    { name: "POS (Legacy)", icon: ShoppingCart, path: "/admin/pos" },
    { name: "Global Settings", icon: Settings, path: "/admin/settings" }
];

export default function Sidebar() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <aside className="w-[240px] bg-[#262255] border-r border-[#2A2760]/20 h-screen fixed left-0 top-0 flex flex-col z-50 text-slate-200">
            {/* Top Section */}
            <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#1a192b] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <LayoutDashboard size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-xl text-white tracking-tight leading-none">Hybrid POS</h1>
                        <p className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-widest">ADMIN CONSOLE</p>
                    </div>
                </div>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {menu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-[#2A2760] text-white shadow-md shadow-indigo-900/10"
                                    : "text-slate-300 hover:bg-[#2A2760] hover:text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-sm">{item.name}</span>
                                    </div>
                                    {isActive && (
                                        <ChevronRight size={14} className="text-indigo-400" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                    <div className="bg-[#2A2760] rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#262255] border border-[#2A2760] flex items-center justify-center text-white font-bold text-xs uppercase">
                            SA
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">Super Admin</p>
                            <p className="text-[10px] text-slate-300 truncate">Global Region</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition-all font-bold text-sm"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
