import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X, Bell } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Sidebar - Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Mobile Content */}
            <div className={`
        fixed inset-y-0 left-0 w-[240px] bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <Sidebar />
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-6 right-4 p-2 text-slate-400 hover:text-slate-900"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:pl-[240px]">
                {/* Top Navbar for Mobile & Desktop Utility */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden lg:block">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Terminal</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-900 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 leading-none">Anzal Shaikh</p>
                                <p className="text-[10px] text-slate-500 font-medium">Head of Operations</p>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-[#1a192b] flex items-center justify-center text-white font-black group-hover:scale-105 transition-transform shadow-lg shadow-indigo-100">
                                AS
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
