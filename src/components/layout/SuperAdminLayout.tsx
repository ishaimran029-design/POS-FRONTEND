import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import SuperAdminSidebar from './SuperAdminSidebar';
import PageLoader from '../ui/PageLoader';

const SuperAdminLayout: React.FC = () => {
    const { isAuthenticated, isLoading, user, hydrate } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            hydrate();
        }
    }, [isAuthenticated, hydrate]);

    if (isLoading) {
        return <PageLoader />;
    }

    // Protect route: Must be authenticated and have SUPER_ADMIN role
    if (!isAuthenticated) {
        return <Navigate to="/super-admin/login" state={{ from: location }} replace />;
    }

    if (user?.role !== 'SUPER_ADMIN') {
        return <Navigate to="/unauthorized" replace />;
    }

    return (
        <div className="super-admin-root flex bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 font-sans">
            <SuperAdminSidebar />
            
            <div className="flex-1 flex flex-col ml-[260px]">
                {/* Optional Sticky Header to match Store Admin */}
                <header className="h-16 bg-white/80 border-b border-slate-200 dark:bg-slate-900/90 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest leading-none">Infrastructure Command Console</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{user?.name}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">Super User</p>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 animate-in fade-in duration-500">
                    <div className="space-y-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            <div id="admin-toasts" className="fixed top-10 right-10 z-[100] flex flex-col gap-4 pointer-events-none" />
        </div>
    );
};

export default SuperAdminLayout;
