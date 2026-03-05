import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Store, User, MapPin, Settings2, Loader2, AlertCircle } from 'lucide-react';
import { storesApi } from '../../service/api';

const CreateStorePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    seedSupermarket: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await storesApi.create(formData);
      if (response.data.success) {
        navigate('/super-admin/stores');
      } else {
        setError(response.data.message || 'Failed to create store');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error occurred during creation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <button 
        onClick={() => navigate('/super-admin/stores')}
        className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Stores
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Store size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Provision New Store</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Create a new branch and assign an initial Store Admin account.</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form id="createStoreForm" onSubmit={handleSubmit} className="space-y-10">
            
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center space-x-3 text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Section: Store Details */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                <Store size={16} className="text-indigo-500" />
                <span>Store Identity</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Store Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="E.g. Downtown Flagship" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Support Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="support@branch.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Support Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="+1 555-0100" />
                </div>
              </div>
            </div>

            {/* Section: Location */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                <MapPin size={16} className="text-emerald-500" />
                <span>Location</span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Street Address *</label>
                  <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="123 Retail Ave" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                  <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="New York" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">State/Region</label>
                  <input name="state" value={formData.state} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="NY" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zip/Postal Code</label>
                  <input name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="10001" />
                </div>
              </div>
            </div>

            {/* Section: Admin Account */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                <User size={16} className="text-amber-500" />
                <span>Initial Store Admin Account</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Name *</label>
                  <input required name="adminName" value={formData.adminName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Email *</label>
                  <input required type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="jane.doe@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Initial Password *</label>
                  <input required type="password" name="adminPassword" value={formData.adminPassword} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-100 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Must be 8+ chars with uppercase, digit, special char" />
                  <p className="text-xs text-slate-400 mt-2 font-medium">Password will be securely hashed before storage.</p>
                </div>
              </div>
            </div>

            {/* Section: Configuration */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                <Settings2 size={16} className="text-blue-500" />
                <span>Configuration</span>
              </div>
              <div className="flex items-center p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <input 
                  type="checkbox" 
                  id="seedSupermarket" 
                  name="seedSupermarket"
                  checked={formData.seedSupermarket} 
                  onChange={handleChange}
                  className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="seedSupermarket" className="ml-4 block text-sm font-bold text-slate-900 cursor-pointer">
                  Auto-seed default categories & product templates
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={() => navigate('/super-admin/stores')}
            className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="createStoreForm"
            disabled={loading}
            className="px-8 py-3 bg-[#1f1e35] text-white font-bold rounded-xl hover:bg-[#2a2845] transition-colors shadow-md shadow-slate-900/10 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Provisioning...</span>
              </>
            ) : (
              <span>Provision Store</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateStorePage;
