import { Search, Bell, HelpCircle, Plus, ChevronRight, Menu, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

interface TopNavbarProps {
    onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
    const { theme, toggleTheme } = useThemeStore();
    return (
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between shadow-sm shadow-slate-100/50 dark:shadow-none transition-colors duration-300">
            {/* Left: Menu (Mobile) & Breadcrumb */}
            <div className="flex items-center gap-4 sm:gap-8">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-slate-400 tracking-widest uppercase truncate max-w-[120px] sm:max-w-none">
                    <span className="hover:text-[#2563EB] cursor-pointer transition-colors">Home</span>
                    <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
                    <span className="text-slate-900 dark:text-white border-b-2 border-[#2563EB] pb-0.5">Dashboard</span>
                </div>
                <div className="relative hidden md:block group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search transactions, products..."
                        className="w-80 pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-2xl text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB]/10 focus:ring-4 focus:ring-[#2563EB]/5 transition-all placeholder:text-slate-400 font-bold text-slate-900 dark:text-slate-100"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 rounded-xl transition-all">
                        <HelpCircle size={20} />
                    </button>
                    <button 
                        onClick={toggleTheme}
                        className="p-2.5 text-slate-400 hover:text-[#2563EB] hover:bg-[#2563EB]/5 rounded-xl transition-all"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-100 mx-2"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">MAIN BRANCH</p>
                        <div className="flex items-center justify-end gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-200"></span>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black tracking-widest uppercase">ONLINE</p>
                        </div>
                    </div>
                        <Plus size={18} className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                </div>
            </div>
        </header>
    );
}
