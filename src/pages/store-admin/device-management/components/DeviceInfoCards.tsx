import React from 'react';
import { Info, Shield, Printer } from 'lucide-react';

const cards = [
    {
        icon: Info,
        text: 'Ensure the device IP is static to avoid connection issues with printers.',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600'
    },
    {
        icon: Shield,
        text: 'Serial numbers are unique and can only be registered once per account.',
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600'
    },
    {
        icon: Printer,
        text: 'Check printer drivers are installed before registering the device.',
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-600'
    }
];

export const DeviceInfoCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {cards.map((card, index) => (
                <div key={index} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
                    <div className={`p-2 ${card.bgColor} ${card.iconColor} rounded-lg`}>
                        <card.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        {card.text}
                    </p>
                </div>
            ))}
        </div>
    );
};
