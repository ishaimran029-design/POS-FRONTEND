import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Boxes,
    ShoppingCart,
    Monitor,
    BarChart3,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    Package,
    Layers,
    Settings2
} from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/store-admin/dashboard' },
    { name: 'Staff Management', icon: Users, path: '/store-admin/staff' },
    {
        name: 'Inventory',
        icon: Boxes,
        path: '/store-admin/inventory',
        children: [
            { name: 'Stock Levels', icon: Layers, path: '/store-admin/inventory/stocks' },
            { name: 'Products', icon: Package, path: '/store-admin/inventory/products' },
            { name: 'Categories', icon: Layers, path: '/categories' },
            { name: 'Adjustments', icon: Settings2, path: '/store-admin/inventory/adjustments' },
        ]
    },
    { name: 'Sales', icon: ShoppingCart, path: '/sales-transactions' },
    { name: 'Devices', icon: Monitor, path: '/store-admin/devices' },
    { name: 'Reports', icon: BarChart3, path: '/store-admin/reports' },
    { name: 'Store Settings', icon: Settings, path: '/store-admin/settings' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { logout } = useAuthStore();
    const [inventoryOpen, setInventoryOpen] = React.useState(true);

    return (
        <aside className={`w-64 bg-white border-r border-gray-200 text-gray-600 h-screen fixed top-0 flex flex-col z-[60] transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} left-0 shadow-2xl lg:shadow-none`}>
            {/* Close button (Mobile only) */}
            <button
                onClick={onClose}
                className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            >
                <ChevronRight size={20} className="rotate-180" />
            </button>

            {/* Brand */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <LayoutDashboard size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-xl text-gray-900 tracking-tight leading-none">Hybrid POS</h1>
                        <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">STORE ADMIN</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, idx) => {
                    if (item.children) {
                        return (
                            <div key={idx} className="space-y-1">
                                <button
                                    onClick={() => setInventoryOpen(!inventoryOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:bg-blue-50 hover:text-blue-600 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className="text-gray-400 group-hover:text-blue-500" />
                                        <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                    </div>
                                    {inventoryOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                                {inventoryOpen && (
                                    <div className="pl-12 space-y-1">
                                        {item.children.map((child, cIdx) => (
                                            <NavLink
                                                key={cIdx}
                                                to={child.path}
                                                className={({ isActive }) =>
                                                    `block py-2 text-sm font-medium transition-all hover:text-blue-600 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-500'}`
                                                }
                                            >
                                                {child.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <NavLink
                            key={idx}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-blue-50 text-blue-600 font-bold"
                                    : "hover:bg-blue-50 hover:text-blue-600 text-gray-500"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={20} className={isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500"} />
                                    <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-gray-100">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-black shadow-inner">
                        AM
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">Anzal Manager</p>
                        <p className="text-[10px] text-gray-400 truncate">Store Manager</p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
