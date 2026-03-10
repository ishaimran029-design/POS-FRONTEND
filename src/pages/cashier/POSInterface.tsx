import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Scan,
  CreditCard,
  Trash2,
  Minus,
  Plus,
  X,
  Percent,
  IndianRupee,
  Clock,
  UserCircle2,
  Wifi,
  WifiOff,
  AlertCircle,
  Search,
} from 'lucide-react';
import { getProductByBarcode, searchProducts } from '../../api/products.api';
import { createSale } from '../../api/sales.api';
import { useAuthStore } from '../../store/useAuthStore';
import { useDeviceStore } from '../../store/useDeviceStore';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  sellingPrice?: number;
  price?: number;
  sku?: string;
  barcode?: string;
  stock?: number;
  taxPercentage?: number;
};

type DiscountMode = 'amount' | 'percent';

const TAX_RATE = 0.18; // 18% GST placeholder – can be wired to backend later

const OFFLINE_SALES_KEY = 'cashier-offline-sales';

const POSInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { deviceId } = useDeviceStore();
  const displayTerminalName = user?.assignedTerminals?.[0]?.deviceName ?? null;

  const [barcodeInput, setBarcodeInput] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountMode, setDiscountMode] = useState<DiscountMode>('amount');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [modalQuery, setModalQuery] = useState('');
  const [modalResults, setModalResults] = useState<Product[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  // Top bar time
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  // Online / offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Totals
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!discountValue) return 0;
    if (discountMode === 'amount') return Math.min(discountValue, subtotal);
    // Percent
    return Math.min((subtotal * discountValue) / 100, subtotal);
  }, [discountMode, discountValue, subtotal]);

  const taxableBase = Math.max(subtotal - discountAmount, 0);
  const tax = taxableBase * TAX_RATE;
  const total = taxableBase + tax;

  const canCompleteSale = cart.length > 0 && !!paymentMethod && !!deviceId;

  const handleAddProductToCart = (product: Product) => {
    const unitPrice =
      (product as any).sellingPrice ?? (product as any).price ?? 0;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handleScanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = barcodeInput.trim();
    if (!value) return;

    setError(null);

    const looksLikeBarcode = /^[0-9\-]{6,}$/.test(value);

    if (!looksLikeBarcode) {
      // Open modal search
      setProductModalOpen(true);
      setModalQuery(value);
      return;
    }

    try {
      const res = await getProductByBarcode(value, deviceId);
      if (res.data?.success && res.data.data) {
        const product = res.data.data as Product;
        handleAddProductToCart(product);
        setBarcodeInput('');
      } else {
        setError(res.data?.message || 'Product not found');
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Product not found');
      } else {
        setError(err.response?.data?.message || 'Unable to fetch product');
      }
    }
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updated;
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    if (!cart.length) return;
    if (!window.confirm('Clear all items from cart?')) return;
    setCart([]);
    setDiscountValue(0);
    setPaymentMethod(null);
    setNotes('');
    setError(null);
  };

  const handleCompleteSale = async () => {
    if (!canCompleteSale || !deviceId) return;

    setIsSubmitting(true);
    setError(null);

    const idempotencyKey =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const payload = {
      deviceId,
      paymentMethod,
      discountAmount,
      notes: notes || undefined,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      if (isOnline) {
        const res = await createSale(payload, idempotencyKey);
        if (res.data?.success && res.data.data) {
          const sale = res.data.data;
          // Clear cart before navigating
          setCart([]);
          setDiscountValue(0);
          setPaymentMethod(null);
          setNotes('');
          navigate(`/cashier/receipt/${sale.id}`, {
            state: { sale, status: 'COMPLETED' },
          });
        } else {
          setError(res.data?.message || 'Unable to complete sale');
        }
      } else {
        const offlineId = `OFF-${Date.now()}`;
        const existingRaw = localStorage.getItem(OFFLINE_SALES_KEY);
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const offlineSale = {
          tempId: offlineId,
          createdAt: new Date().toISOString(),
          deviceId,
          paymentMethod,
          discountAmount,
          notes: notes || undefined,
        items: payload.items,
          totals: { subtotal, tax, total },
        };
        localStorage.setItem(
          OFFLINE_SALES_KEY,
          JSON.stringify([...existing, offlineSale])
        );

        setCart([]);
        setDiscountValue(0);
        setPaymentMethod(null);
        setNotes('');

        navigate(`/cashier/receipt/offline/${offlineId}`, {
          state: { sale: offlineSale, status: 'PENDING_SYNC' },
        });
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to complete sale';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Product search modal behaviour (debounced)
  useEffect(() => {
    if (!productModalOpen) return;
    if (!modalQuery.trim()) {
      setModalResults([]);
      return;
    }

    const handle = setTimeout(async () => {
      setModalLoading(true);
      try {
        const res = await searchProducts(modalQuery.trim());
        if (res.data?.success && Array.isArray(res.data.data)) {
          setModalResults(res.data.data as Product[]);
        } else if (Array.isArray(res.data)) {
          setModalResults(res.data as Product[]);
        } else {
          setModalResults([]);
        }
      } catch {
        setModalResults([]);
      } finally {
        setModalLoading(false);
      }
    }, 300);

    return () => clearTimeout(handle);
  }, [modalQuery, productModalOpen]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white border border-slate-200 rounded-3xl">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/60">
        <div>
          <div className="text-sm font-extrabold text-slate-900">
            {user?.store?.name || 'Store'}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            CASHIER POS TERMINAL
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-600">
          {now.toLocaleString()}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isOnline ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center space-x-2">
            <UserCircle2 size={18} className="text-slate-500" />
            <div className="text-[11px] leading-tight">
              <div className="font-bold text-slate-800">
                {user?.name || user?.email}
              </div>
              {displayTerminalName && (
                <div className="text-slate-500 font-medium">
                  Terminal: {displayTerminalName}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {isOnline === false && (
        <div className="flex items-center space-x-3 px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-sm font-medium">
          <WifiOff size={16} className="text-amber-500" />
          <span>
            OFFLINE MODE – Sales will be saved and synced when back online.
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-3 px-6 py-3 bg-red-50 border-b border-red-200 text-red-700 text-sm font-medium">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Scan & Cart Table */}
        <section className="flex-1 flex flex-col p-6 overflow-hidden border-r border-slate-200">
          {/* Scan / Search */}
          <form onSubmit={handleScanSubmit} className="mb-4">
            <div className="relative">
              <Scan className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Scan barcode or type product..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={() => {
                  setProductModalOpen(true);
                  setModalQuery('');
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-900 text-[11px] font-bold text-white uppercase tracking-widest"
              >
                <Search size={14} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Cart Table */}
          <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 bg-slate-50/40">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-2 py-2 text-center w-32">Qty</th>
                  <th className="px-4 py-2 text-right w-24">@Price</th>
                  <th className="px-4 py-2 text-right w-28">Line Total</th>
                  <th className="px-2 py-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-xs font-semibold text-slate-500"
                    >
                      Scan a product barcode or search by name to start a new
                      cart.
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="px-4 py-2">
                        <div className="text-[13px] font-semibold text-slate-900">
                          {item.name}
                        </div>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 text-slate-500 hover:text-emerald-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 text-slate-500 hover:text-emerald-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right text-[13px] font-semibold text-slate-700">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right text-[13px] font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 text-slate-400 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <button
              type="button"
              onClick={handleClearCart}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100"
            >
              <Trash2 size={14} />
              <span>Clear All Items</span>
            </button>
          </div>
        </section>

        {/* Right: Totals & Payment */}
        <aside className="w-80 flex flex-col bg-white/50">
          <div className="p-4 border-b border-slate-200 flex items-center space-x-2">
            <ShoppingCart size={18} className="text-emerald-400" />
            <h2 className="text-sm font-bold">Active Cart</h2>
          </div>

          <div className="p-4 border-b border-slate-200 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-800">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tax (GST)</span>
              <span className="font-semibold text-slate-800">
                ₹{tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Discount</span>
              <span className="font-semibold text-emerald-600">
                -₹{discountAmount.toFixed(2)}
              </span>
            </div>
            <hr className="my-2 border-dashed border-slate-200" />
            <div className="flex justify-between items-center text-lg font-black">
              <span className="flex items-center space-x-1 text-slate-900">
                <IndianRupee size={18} />
                <span>Total</span>
              </span>
              <span className="text-emerald-500">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Discount controls */}
          <div className="p-4 border-b border-slate-200 space-y-3 text-xs">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setDiscountMode('amount')}
                className={`flex-1 inline-flex items-center justify-center space-x-1 rounded-lg border px-2 py-1 font-bold uppercase tracking-widest ${
                  discountMode === 'amount'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-600 bg-white'
                }`}
              >
                <IndianRupee size={13} />
                <span>Amount</span>
              </button>
              <button
                type="button"
                onClick={() => setDiscountMode('percent')}
                className={`flex-1 inline-flex items-center justify-center space-x-1 rounded-lg border px-2 py-1 font-bold uppercase tracking-widest ${
                  discountMode === 'percent'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-600 bg-white'
                }`}
              >
                <Percent size={13} />
                <span>Percent</span>
              </button>
            </div>
            <div className="flex space-x-2 items-center">
              <input
                type="number"
                min={0}
                value={discountValue || ''}
                onChange={(e) => setDiscountValue(Number(e.target.value) || 0)}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder={discountMode === 'amount' ? '₹ amount' : '% value'}
              />
              <span className="text-[11px] text-slate-500 font-semibold">
                APPLY DISCOUNT
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="text-[11px] text-emerald-700 font-medium">
                Applied discount:{' '}
                {discountMode === 'amount'
                  ? `₹${discountAmount.toFixed(2)}`
                  : `${discountValue}% (₹${discountAmount.toFixed(2)})`}
              </div>
            )}
          </div>

          {/* Payment methods */}
          <div className="p-4 border-b border-slate-200 space-y-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
              Payment Method
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['CASH', 'CARD', 'UPI', 'CHEQUE', 'DIGITAL_WALLET', 'OTHER'].map(
                (method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-lg px-2 py-1.5 text-[11px] font-bold uppercase tracking-widest border ${
                      paymentMethod === method
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {method.replace('_', ' ')}
                  </button>
                )
              )}
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                <span>Customer Notes</span>
                <span className="text-slate-400">(optional)</span>
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Customer notes..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-900 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-100 focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="p-4 space-y-3 border-t border-slate-200 bg-slate-50/80 mt-auto">
            <div className="flex items-center justify-between mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Actions</span>
              <span className="flex items-center space-x-1 text-slate-400">
                <Clock size={13} />
                <span>Ready</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={handleClearCart}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-100 flex items-center justify-center space-x-1"
              >
                <Trash2 size={14} />
                <span>Clear Cart</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/cashier/inventory')}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-100 flex items-center justify-center space-x-1"
              >
                <Scan size={14} />
                <span>Inventory Check</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => navigate('/cashier/profile')}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-100 flex items-center justify-center space-x-1"
              >
                <UserCircle2 size={14} />
                <span>Profile</span>
              </button>
              <button
                type="button"
                disabled={!canCompleteSale || isSubmitting}
                onClick={handleCompleteSale}
                className="rounded-xl bg-emerald-600 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 disabled:bg-emerald-400 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <CreditCard size={14} className="animate-pulse" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={14} />
                    <span>Complete Sale</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <Wifi size={13} className="text-emerald-500" />
                ) : (
                  <WifiOff size={13} className="text-amber-500" />
                )}
                <span>
                  {isOnline
                    ? 'Sales posted directly to server'
                    : 'Sales stored locally for sync'}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Product Search Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
              <h2 className="text-sm font-extrabold text-slate-900">
                Search Products
              </h2>
              <button
                type="button"
                onClick={() => {
                  setProductModalOpen(false);
                  setModalQuery('');
                  setModalResults([]);
                }}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={modalQuery}
                  onChange={(e) => setModalQuery(e.target.value)}
                  placeholder="Search by name, SKU..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-100 focus:border-emerald-400"
                />
              </div>
              <div className="max-h-64 overflow-auto rounded-xl border border-slate-100 bg-slate-50/40">
                {modalLoading ? (
                  <div className="flex items-center justify-center py-6 text-xs text-slate-500">
                    Loading products...
                  </div>
                ) : modalResults.length === 0 ? (
                  <div className="flex items-center justify-center py-6 text-xs text-slate-500">
                    No products found. Try a different search.
                  </div>
                ) : (
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-left">Product</th>
                        <th className="px-3 py-2 text-left">SKU</th>
                        <th className="px-3 py-2 text-right">Price</th>
                        <th className="px-3 py-2 w-24"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalResults.map((p) => (
                        <tr
                          key={p.id}
                          className="border-t border-slate-100 hover:bg-white"
                        >
                          <td className="px-3 py-2">
                            <div className="font-semibold text-slate-900">
                              {p.name}
                            </div>
                            {typeof p.stock === 'number' && (
                              <div className="text-[10px] text-slate-500">
                                Stock: {p.stock}
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2 text-slate-600">
                            {p.sku || p.barcode || '-'}
                          </td>
                          <td className="px-3 py-2 text-right font-semibold text-slate-800">
                            ₹{(
                              (p as any).sellingPrice ?? (p as any).price ?? 0
                            ).toFixed(2)}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                handleAddProductToCart(p);
                              }}
                              className="inline-flex items-center space-x-1 rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900"
                            >
                              <Plus size={12} />
                              <span>Add</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSInterface;
