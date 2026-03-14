import React, { useRef, useState } from 'react';
import { Camera, HelpCircle, FileText, ChevronRight } from 'lucide-react';

export const StoreHealthCard = () => {
    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-5 animate-fade-in hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-slate-900 tracking-tight uppercase">Profile Health</h3>
                <span className="text-blue-600 font-black text-xs">85%</span>
            </div>
            
            <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 shadow-[2px_0_8px_rgba(37,99,235,0.4)]" 
                    style={{ width: '85%' }}
                />
            </div>
            
            <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                Add store logo & tax ID to reach 100%.
            </p>
        </div>
    );
};

export const StoreBrandingCard = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6 animate-fade-in hover:shadow-md transition-all duration-300">
            <h3 className="text-[10px] font-black text-slate-900 tracking-tight uppercase">Store Branding</h3>
            
            <div className="flex flex-col items-center gap-5 py-2">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div 
                    onClick={triggerUpload}
                    className="w-28 h-28 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 group hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer overflow-hidden relative shadow-inner"
                >
                    {preview ? (
                        <img src={preview} alt="Store Logo Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Camera size={24} className="group-hover:text-blue-600 transition-colors" />
                            <span className="text-[8px] font-black uppercase tracking-tighter">Upload</span>
                        </div>
                    )}
                </div>
                
                <div className="text-center">
                    <button 
                        onClick={triggerUpload}
                        className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
                    >
                        Change Logo
                    </button>
                    <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-[2px]">
                        512x512 • SVG, PNG
                    </p>
                </div>
            </div>
        </div>
    );
};

export const QuickHelpCard = () => {
    return (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6 animate-fade-in hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                    <HelpCircle size={16} />
                </div>
                <h3 className="text-[10px] font-black text-slate-900 tracking-tight uppercase">Quick Help</h3>
            </div>
            
            <div className="space-y-4 px-1">
                <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                    <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                        Currency updates will apply to all historical records.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                    <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                        Timezones affect daily ledger reset timing.
                    </p>
                </div>
            </div>

            <button className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-blue-100 transition-all active:scale-95 shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
                        <FileText size={16} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Documentation</span>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </button>
        </div>
    );
};
