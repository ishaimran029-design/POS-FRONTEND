import React from 'react';

interface SettingsTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'Store Profile', label: 'Store Profile' },
        { id: 'POS Configuration', label: 'POS Configuration' },
        { id: 'Tax & Billing', label: 'Tax & Billing' },
        { id: 'Notifications', label: 'Notifications' },
    ];

    return (
        <div className="flex items-center gap-10 border-b border-slate-100 mb-10 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                        activeTab === tab.id
                            ? 'text-blue-600'
                            : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full animate-slide-up shadow-[0_-2px_8px_rgba(37,99,235,0.2)]" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default SettingsTabs;
