import { Search, Bell, HelpCircle, Plus, ChevronRight, Menu } from 'lucide-react';

interface TopNavbarProps {
    onMenuClick: () => void;
    onNewTransaction?: () => void;
}

export default function TopNavbar({ onMenuClick, onNewTransaction }: TopNavbarProps) {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
            {/* Left: Menu (Mobile) & Breadcrumb */}
            <div className="flex items-center gap-4 sm:gap-8">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase truncate max-w-[120px] sm:max-w-none">
                    <span>Home</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-900">Dashboard</span>
                </div>
                <div className="relative hidden md:block">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search transactions, products..."
                        className="w-72 pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Center: Title (Optional placement) */}
            <h2 className="hidden lg:block text-slate-800 font-extrabold text-lg tracking-tight">Main Dashboard Area</h2>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => onNewTransaction?.()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-extrabold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 transform active:scale-95"
                >
                    <Plus size={18} />
                    <span>New Transaction</span>
                </button>

                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                        <HelpCircle size={20} />
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-slate-900 uppercase">Karachi Br.</p>
                        <p className="text-[10px] text-emerald-600 font-black">ONLINE</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-xl">
                        K1
                    </div>
                </div>
            </div>
        </header>
    );
}
