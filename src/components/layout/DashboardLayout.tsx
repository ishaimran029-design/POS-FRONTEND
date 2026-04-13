import React from 'react';
import { useLocation } from 'react-router-dom';
import { Columns2, Search, Sun, Moon } from 'lucide-react';
import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import AppSidebar from '@/components/app-sidebar';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  title?: string;
  subtitle?: string;
  role?: string;
  accentColor?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
  headerExtra?: React.ReactNode;
}

const DashboardContent: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarContent,
  title: propTitle,
  subtitle: propSubtitle,
  role: propRole,
  accentColor = 'indigo',
  headerExtra
}) => {
  const { collapsed, isMobileOpen, closeMobile } = useSidebar();
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const isSuper = location.pathname.startsWith('/super-admin');


  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar Wrapper */}
      {sidebarContent ? (
        <>
          {/* Custom Desktop Sidebar */}
          <aside
            className={`bg-[#262255] border-r border-[#262255]/20 text-slate-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-300 hidden lg:flex ${collapsed ? 'w-20' : 'w-[260px]'
              }`}
          >
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              {sidebarContent}
            </div>
          </aside>
          {/* Custom Mobile Drawer */}
          {isMobileOpen && (
            <div className="fixed inset-0 z-[60] lg:hidden">
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeMobile} />
              <div className="fixed left-0 top-0 h-full w-[260px] bg-[#262255] z-[70] shadow-2xl animate-in slide-in-from-left duration-300 p-4 overflow-y-auto custom-scrollbar">
                {sidebarContent}
              </div>
            </div>
          )}
        </>
      ) : (
        <AppSidebar />
      )}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-[260px]'
          }`}
      >
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Columns2 size={20} />
            </SidebarTrigger>

            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${accentColor === 'indigo' ? 'bg-indigo-500' :
                  accentColor === 'emerald' ? 'bg-emerald-500' :
                    accentColor === 'amber' ? 'bg-amber-500' : 'bg-slate-500'
                }`} />
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-slate-900 dark:text-white uppercase tracking-[0.2em] leading-none">
                  {propTitle || (isSuper ? 'Infrastructure Console' : 'Operations Hub')}
                </span>
                {propSubtitle && (
                  <span className="text-[9px] text-slate-400 font-medium uppercase tracking-widest mt-1 opacity-80">{propSubtitle}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {headerExtra}

            {!isSuper && !headerExtra && (
              <div className="relative hidden md:block group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-[11px] font-medium transition-all outline-none"
                />
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            <div className="flex items-center gap-3 pl-1 group cursor-pointer">
              <div className="text-right hidden xs:block">
                <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 leading-none truncate max-w-[120px] tracking-tight">{user?.name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.15em] mt-1 font-num">{propRole || user?.role?.replace('_', ' ')}</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#262255] border border-white/10 flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
                {(user?.name || 'U')[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 animate-in fade-in duration-500 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent {...props} />
    </SidebarProvider>
  );
}
