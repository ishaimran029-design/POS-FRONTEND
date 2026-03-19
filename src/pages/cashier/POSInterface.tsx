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
  Package,
} from 'lucide-react';
import { getProductByBarcode, searchProducts, fetchProducts } from '../../api/products.api';
import { createSale } from '../../api/sales.api';
import { useAuthStore } from '../../store/useAuthStore';
import { useDeviceStore } from '../../store/useDeviceStore';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type HoldOrder = {
  id: string;
  items: CartItem[];
  timestamp: Date;
  total: number;
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
  const [holdOrders, setHoldOrders] = useState<HoldOrder[]>([]);
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Top bar time
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  // Fetch all products for grid display
  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      setProductsError(null);
      try {
        console.log('🔄 POSInterface - Component mounted, loading products from /products endpoint...');
        
        // Try to fetch all active products
        const res = await fetchProducts();
        console.log('📦 POSInterface - Raw API Response:', res);
        console.log('📦 POSInterface - Response data:', res.data);
        console.log('📦 POSInterface - Response status:', res.status);
        
        let products: Product[] = [];
        
        // Handle different response formats
        if (res.data?.success && Array.isArray(res.data.data)) {
          products = res.data.data as Product[];
          console.log('✅ POSInterface - Found products in res.data.data:', products.length, 'products');
        } else if (res.data?.data && Array.isArray(res.data.data)) {
          products = res.data.data as Product[];
          console.log('✅ POSInterface - Found products in res.data.data (nested):', products.length, 'products');
        } else if (Array.isArray(res.data)) {
          products = res.data as Product[];
          console.log('✅ POSInterface - Found products in res.data (direct array):', products.length, 'products');
        } else {
          console.warn('⚠️ POSInterface - Unexpected API response structure:', res.data);
          products = [];
        }
        
        // Filter to only show active products if not already filtered by API
        const activeProducts = products.filter((p: any) => p.isActive !== false);
        console.log('✅ POSInterface - Active products after filtering:', activeProducts.length, activeProducts);
        
        setAllProducts(activeProducts);
      } catch (err: any) {
        console.error('❌ POSInterface - Error fetching products:', err);
        console.error('❌ POSInterface - Error details:', {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
        });
        const errorMsg = err.response?.data?.message || err.message || 'Failed to load products';
        setProductsError(errorMsg);
        setAllProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };
    
    loadProducts();
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
    const rawPrice = (product as any).sellingPrice ?? (product as any).price ?? 0;
    const unitPrice = typeof rawPrice === 'number' ? rawPrice : Number(rawPrice) || 0;
    
    console.log('🛒 [POSInterface] Adding to cart:', {
      productId: product.id,
      productName: product.name,
      rawPrice,
      unitPrice,
      priceType: typeof unitPrice,
    });
    
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

  const handleHoldOrder = () => {
    if (!cart.length) {
      setError('Cart is empty. Cannot hold an empty order.');
      return;
    }
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newHoldOrder: HoldOrder = {
      id: `ORDER-${Date.now()}`,
      items: [...cart],
      timestamp: new Date(),
      total: cartTotal,
    };
    setHoldOrders((prev) => [newHoldOrder, ...prev]);
    setCart([]);
    setDiscountValue(0);
    setPaymentMethod(null);
    setNotes('');
    setError(null);
  };

  const handleResumeOrder = (holdOrderId: string) => {
    const holdOrder = holdOrders.find((order) => order.id === holdOrderId);
    if (!holdOrder) return;
    setCart(holdOrder.items);
    setHoldOrders((prev) => prev.filter((order) => order.id !== holdOrderId));
  };

  const handleDeleteHoldOrder = (holdOrderId: string) => {
    if (!window.confirm('Delete this hold order?')) return;
    setHoldOrders((prev) => prev.filter((order) => order.id !== holdOrderId));
  };

  const handleCompleteSale = async () => {
    console.log('🔴 [POSInterface] handleCompleteSale called');
    console.log('🔵 [POSInterface] canCompleteSale:', canCompleteSale);
    console.log('🔵 [POSInterface] deviceId:', deviceId);
    console.log('🔵 [POSInterface] cart.length:', cart.length);
    console.log('🔵 [POSInterface] paymentMethod:', paymentMethod);
    
    if (!canCompleteSale || !deviceId) {
      console.error('❌ [POSInterface] Sale blocked - missing requirements');
      setError('Please select a payment method and ensure you are connected to a POS terminal.');
      return;
    }

    // Validate items array is not empty
    if (!cart || cart.length === 0) {
      console.error('❌ [POSInterface] Sale blocked - cart is empty');
      setError('Cart is empty. Please add items before completing the sale.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const idempotencyKey =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // Ensure all numeric values are properly converted to numbers (not strings)
    const numericDiscountAmount = typeof discountAmount === 'number' ? discountAmount : Number(discountAmount) || 0;

    // Build items array matching backend expectations
    // Backend validates: item.productId, item.quantity > 0, item.price >= 0
    // We also send productName, unitPrice, totalPrice for completeness
    const itemsPayload = cart.map((item) => {
      // Ensure price is a number, not a string (CRITICAL for backend validation)
      const numericPrice = typeof item.price === 'number' ? item.price : Number(item.price) || 0;
      // Ensure quantity is a number, not a string
      const numericQuantity = typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 1;
      // Calculate total price for this line item
      const totalPrice = numericPrice * numericQuantity;
      
      console.log('🛒 [POSInterface] Processing item:', {
        id: item.id,
        name: item.name,
        rawPrice: item.price,
        numericPrice,
        numericQuantity,
        totalPrice,
      });
      
      return {
        productId: item.id,
        productName: item.name,
        unitPrice: numericPrice,
        quantity: numericQuantity,
        totalPrice: totalPrice,
        price: numericPrice, // REQUIRED: Backend validates this field name
      };
    });

    const payload = {
      deviceId: deviceId,
      paymentMethod: paymentMethod,
      discountAmount: numericDiscountAmount,
      notes: notes || undefined,
      items: itemsPayload,
    };

    // Validate payload before sending
    const validationErrors = [];
    if (!payload.deviceId) validationErrors.push('deviceId is missing');
    if (!payload.paymentMethod) validationErrors.push('paymentMethod is missing');
    if (!payload.items || payload.items.length === 0) validationErrors.push('items array is empty');
    
    payload.items.forEach((item: any, idx: number) => {
      if (!item.productId) validationErrors.push(`items[${idx}].productId is missing`);
      if (!item.price || item.price < 0) validationErrors.push(`items[${idx}].price must be >= 0`);
      if (!item.quantity || item.quantity <= 0) validationErrors.push(`items[${idx}].quantity must be > 0`);
    });

    if (validationErrors.length > 0) {
      console.error('❌ [POSInterface] Payload validation failed:', validationErrors);
      setError('Invalid sale data: ' + validationErrors.join(', '));
      setIsSubmitting(false);
      return;
    }

    // Log complete payload for debugging
    console.log('🟢 [POSInterface] === SALE PAYLOAD ===');
    console.log('🟢 deviceId:', payload.deviceId, `(type: ${typeof payload.deviceId})`);
    console.log('🟢 paymentMethod:', payload.paymentMethod, `(type: ${typeof payload.paymentMethod})`);
    console.log('🟢 discountAmount:', payload.discountAmount, `(type: ${typeof payload.discountAmount})`);
    console.log('🟢 notes:', payload.notes);
    console.log('🟢 items count:', payload.items.length);
    console.log('🟢 items:', JSON.stringify(payload.items, null, 2));
    console.log('🟢 isOnline:', isOnline);
    console.log('🟢 ==========================');

    try {
      if (isOnline) {
        console.log('📡 [POSInterface] Sending POST /sales request...');
        const res = await createSale(payload, idempotencyKey);
        console.log('✅ [POSInterface] Sale created successfully:', res.data);
        
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
          console.error('❌ [POSInterface] Sale response missing data:', res.data);
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
          discountAmount: numericDiscountAmount,
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
      console.error('❌ [POSInterface] Sale error:', err);
      console.error('❌ [POSInterface] Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      });
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to complete sale';
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
    <div className="flex flex-col h-full overflow-hidden bg-white border border-slate-200 rounded-3xl">
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

      <div className="flex flex-col overflow-hidden flex-1">
        <div className="flex overflow-hidden flex-1">
          {/* Left: Products Grid & Cart */}
          <section className="flex-1 flex flex-col p-5 overflow-hidden border-r border-slate-200">
            {/* Barcode Scanner */}
            <form onSubmit={handleScanSubmit} className="mb-5">
              <div className="relative">
                <Scan className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  autoFocus
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Scan barcode..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                />
              </div>
            </form>
          {/* Stats Bar */}
          <div className="flex items-center space-x-2 mb-4 text-xs">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1.5 border border-blue-200 text-blue-800">
              <ShoppingCart size={14} />
              <span className="font-semibold">
                Cart: {cart.length} items
              </span>
            </div>
          </div>

          {/* Products Table */}
          <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white mb-4">
            {productsLoading ? (
              <div className="flex items-center justify-center h-full text-xs text-slate-500">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-2"></div>
                  Loading products...
                </div>
              </div>
            ) : productsError ? (
              <div className="flex items-center justify-center h-full text-xs text-red-600">
                Error: {productsError}
              </div>
            ) : allProducts.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Package size={28} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No products available</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-slate-50 border-b-2 border-slate-200">
                    <tr className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4">Product</th>
                      <th className="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-3 sm:py-4">SKU</th>
                      <th className="hidden lg:table-cell px-2 sm:px-4 md:px-6 py-3 sm:py-4">Barcode</th>
                      <th className="hidden md:table-cell px-2 sm:px-4 md:px-6 py-3 sm:py-4">Category</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-right">Price</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-right">Stock</th>
                      <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allProducts.map((product, index) => {
                      const stock = (product as any).inventoryStock?.totalQuantity ?? product.stock ?? 0;
                      const price = Number(product.sellingPrice ?? product.price ?? 0);
                      const isOutOfStock = stock <= 0;
                      const isActive = (product as any).isActive !== false;
                      const category = (product as any).category;

                      return (
                        <tr key={product.id} className={`hover:bg-emerald-50/30 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        }`}>
                          <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4">
                            <span className="font-semibold text-xs sm:text-sm text-slate-900">{product.name}</span>
                          </td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-medium text-slate-600 font-mono">{product.sku || '—'}</span>
                          </td>
                          <td className="hidden lg:table-cell px-2 sm:px-4 md:px-6 py-3 sm:py-4">
                            <span className="text-xs text-slate-500 font-mono">{product.barcode || '—'}</span>
                          </td>
                          <td className="hidden md:table-cell px-2 sm:px-4 md:px-6 py-3 sm:py-4">
                            {category ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                                {category.name}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-300">—</span>
                            )}
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-right">
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              ₹{price.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-right">
                            <span className={`text-xs sm:text-sm font-semibold ${
                              isOutOfStock
                                ? 'text-rose-600'
                                : stock <= 10
                                ? 'text-amber-600'
                                : 'text-emerald-600'
                            }`}>
                              {stock}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                              <button
                                type="button"
                                onClick={() => handleAddProductToCart(product)}
                                disabled={isOutOfStock}
                                className={`inline-flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                  isOutOfStock
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md'
                                }`}
                              >
                                <Plus size={11} className="sm:hidden" />
                                <Plus size={13} className="hidden sm:block" />
                                <span className="hidden sm:inline">Add</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAddProductToCart(product)}
                                disabled={isOutOfStock}
                                className={`inline-flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                  isOutOfStock
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md'
                                }`}
                              >
                                <Clock size={11} className="sm:hidden" />
                                <Clock size={13} className="hidden sm:block" />
                                <span className="hidden sm:inline">Hold</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Cart Items Display */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                <ShoppingCart size={15} className="text-emerald-600" />
                <span>Cart ({cart.length})</span>
              </h3>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-[10px] font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingCart size={28} className="text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Cart is empty</p>
              </div>
            ) : (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        ₹{item.price.toFixed(0)} x{item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 ml-3">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center text-[10px] font-bold text-slate-700">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded hover:bg-emerald-100 text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 ml-1 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

          {/* Hold Order Button */}
          <div className="p-4 border-t border-slate-200 space-y-2">
            <button
              type="button"
              onClick={handleHoldOrder}
              disabled={!cart.length}
              className="w-full rounded-xl border-2 border-amber-500 bg-amber-50 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-amber-700 hover:bg-amber-100 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 flex items-center justify-center space-x-2 transition-all"
            >
              <Clock size={16} />
              <span>Hold Current Order</span>
            </button>
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

          {/* Hold Orders Section */}
          {holdOrders.length > 0 && (
            <div className="p-4 border-t border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                <Clock size={16} className="text-amber-600" />
                <span>Hold Orders ({holdOrders.length})</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {holdOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-lg border border-amber-200 bg-amber-50 space-y-2 hover:bg-amber-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-900">{order.id}</span>
                      <span className="text-xs font-semibold text-amber-700">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600">
                        {order.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="text-sm font-bold text-amber-900">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleResumeOrder(order.id)}
                        className="flex-1 rounded-lg bg-amber-600 text-white px-2 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition-all"
                      >
                        Resume
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteHoldOrder(order.id)}
                        className="rounded-lg border border-red-300 bg-red-50 text-red-600 px-2 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
        </div>
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
