import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    UploadCloud,
    Package,
    Tag,
    Barcode,
    Layers,
    DollarSign,
    Percent,
    Inbox
} from 'lucide-react';
import Sidebar from '@/components/store-admin/Sidebar';
import TopNavbar from '@/components/store-admin/TopNavbar';
import { cn } from '@/lib/utils';

const subcategoryMapping: Record<string, string[]> = {
    electronics: ['Mobiles', 'Laptops', 'Audio', 'Cameras', 'Accessories'],
    fashion: ['Men\'s Wear', 'Women\'s Wear', 'Footwear', 'Watches', 'Bags'],
    home: ['Kitchenware', 'Furniture', 'Decor', 'Appliances', 'Gardening'],
    other: ['Books', 'Toys', 'Stationery', 'Sports', 'Misc'],
};

export default function AddProductPage() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex">
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden animate-fade-in"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen w-full lg:pl-64">
                <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 md:p-8 lg:p-10 max-w-5xl mx-auto w-full animate-fade-in pb-32">
                    {/* Header */}
                    <div className="mb-8 items-start flex flex-col gap-2">
                        <button
                            onClick={() => navigate('/store-admin/inventory/products')}
                            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group mb-2"
                        >
                            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            <span>Back to Products</span>
                        </button>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New Product</h1>
                        <p className="text-gray-500 font-medium">Create a new item in your inventory with detailed pricing and stock.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Basic Info & Pricing */}
                        <div className="space-y-8">
                            {/* Basic Information Card */}
                            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <Package size={20} />
                                    </div>
                                    <h2 className="text-lg font-black text-gray-900 tracking-tight">Basic Information</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Wireless Noise Cancelling Headphones"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">SKU</label>
                                            <div className="relative">
                                                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="WRL-HEAD-001"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Barcode</label>
                                            <div className="relative">
                                                <Barcode size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="9876543210123"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Category</label>
                                            <div className="relative">
                                                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <select 
                                                    value={category}
                                                    onChange={(e) => {
                                                        setCategory(e.target.value);
                                                        setSubcategory('');
                                                    }}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-gray-900 cursor-pointer"
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="electronics">Electronics</option>
                                                    <option value="fashion">Fashion</option>
                                                    <option value="home">Home & Kitchen</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={cn(
                                                "block text-xs font-black uppercase tracking-widest mb-2 transition-colors",
                                                category ? "text-gray-500" : "text-gray-400/60"
                                            )}>
                                                Subcategory
                                            </label>
                                            <div className="relative">
                                                <Layers size={16} className={cn(
                                                    "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                                                    category ? "text-gray-400" : "text-gray-300"
                                                )} />
                                                <select 
                                                    value={subcategory}
                                                    onChange={(e) => setSubcategory(e.target.value)}
                                                    disabled={!category}
                                                    className={cn(
                                                        "w-full pl-11 pr-4 py-3 border rounded-xl text-sm outline-none transition-all appearance-none text-gray-900",
                                                        category 
                                                            ? "bg-gray-50 border-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer" 
                                                            : "bg-gray-50/30 border-gray-50 text-gray-400/50 cursor-not-allowed"
                                                    )}
                                                >
                                                    <option value="">{category ? "Choose Subcategory" : "Pick Category First"}</option>
                                                    {category && subcategoryMapping[category]?.map((sub) => (
                                                        <option key={sub} value={sub.toLowerCase()}>{sub}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Card */}
                            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                        <DollarSign size={20} />
                                    </div>
                                    <h2 className="text-lg font-black text-gray-900 tracking-tight">Pricing</h2>
                                </div>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Purchase Price</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rs</span>
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Selling Price</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rs</span>
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Tax Rate (%)</label>
                                            <div className="relative">
                                                <Percent size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Default Discount (%)</label>
                                            <div className="relative">
                                                <Percent size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Inventory & Media */}
                        <div className="space-y-8">
                            {/* Inventory Card */}
                            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                        <Inbox size={20} />
                                    </div>
                                    <h2 className="text-lg font-black text-gray-900 tracking-tight">Inventory</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Initial Stock</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold"
                                        />
                                        <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available quantity in warehouse</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Reorder Level</label>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-bold"
                                        />
                                        <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-rose-400">Low stock alert threshold</p>
                                    </div>
                                </div>
                            </div>

                            {/* Media Upload Card */}
                            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <UploadCloud size={20} />
                                    </div>
                                    <h2 className="text-lg font-black text-gray-900 tracking-tight">Product Media</h2>
                                </div>
                                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer group">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 transition-transform group-hover:scale-110">
                                        <UploadCloud size={32} />
                                    </div>
                                    <h3 className="text-sm font-black text-gray-900 mb-1">Click to upload or drag and drop</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">PNG, JPG or WEBP (MAX. 2MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Bottom Action Bar */}
                <div className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 flex items-center justify-end gap-4 z-50">
                    <button
                        onClick={() => navigate('/store-admin/inventory/products')}
                        className="px-8 py-3.5 border border-gray-200 rounded-2xl text-sm font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest transform active:scale-95"
                    >
                        Cancel
                    </button>
                    <button className="px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 transform active:scale-95 uppercase tracking-widest">
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    );
}
