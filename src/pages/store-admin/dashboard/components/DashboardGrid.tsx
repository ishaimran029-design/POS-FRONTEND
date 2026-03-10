import type { ReactNode } from 'react';

interface DashboardGridProps {
    children: ReactNode;
}

export default function DashboardGrid({ children }: DashboardGridProps) {
    return (
        <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 sm:gap-8 animate-fade-in relative z-0 flex-1 overflow-y-visible pb-24">
            {children}
        </div>
    );
}
