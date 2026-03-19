import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Printer, Mail, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { getSaleById } from '../../api/sales.api';

type ReceiptStatus = 'COMPLETED' | 'PENDING_SYNC';

const ReceiptPage: React.FC = () => {
  const { saleId } = useParams<{ saleId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [sale, setSale] = React.useState<any>(location.state?.sale || null);
  const [status] = React.useState<ReceiptStatus>(
    (location.state?.status as ReceiptStatus) || 'COMPLETED'
  );
  const [email, setEmail] = React.useState('');
  const [emailMessage, setEmailMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSaleIfNeeded = async () => {
      if (sale || !saleId || status === 'PENDING_SYNC') return;
      try {
        const res = await getSaleById(saleId);
        if (res.data?.success && res.data.data) {
          setSale(res.data.data);
        }
      } catch {
        // Ignore; minimal fallback
      }
    };
    fetchSaleIfNeeded();
  }, [sale, saleId, status]);

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReceipt = async () => {
    // Email receipt endpoint is not implemented in backend; show friendly message
    if (!email) return;
    setEmailMessage('Email receipts are not configured on this server.');
  };

  const invoiceNumber =
    sale?.invoiceNumber || sale?.tempId || saleId || 'N/A';

  const createdAt = sale?.createdAt
    ? new Date(sale.createdAt)
    : new Date();

  // Backend returns saleItems with product info
  const items = sale?.saleItems || sale?.items || [];
  const totals = sale?.totals || {};

  return (
    <div className="min-h-[520px] flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Sale Receipt
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Thank you for your purchase.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`inline-flex items-center space-x-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
              status === 'COMPLETED'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {status === 'COMPLETED' ? (
              <CheckCircle2 size={14} />
            ) : (
              <Clock size={14} />
            )}
            <span>
              {status === 'COMPLETED' ? 'Completed' : 'Pending Sync'}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
        <section className="md:col-span-2 border-r border-slate-200 p-6 print:p-4">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-600">
            <div>
              <div className="font-bold text-slate-800">
                Invoice #{invoiceNumber}
              </div>
              <div>{createdAt.toLocaleString()}</div>
            </div>
            {sale?.user && (
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Cashier
                </div>
                <div className="font-semibold text-slate-800">
                  {sale.user.name || sale.user.email}
                </div>
              </div>
            )}
          </div>

          <div className="mb-4 text-xs text-slate-600">
            {sale?.device && (
              <div>
                <span className="font-semibold text-slate-700">
                  Device:
                </span>{' '}
                {sale.device.deviceName}
              </div>
            )}
          </div>

          <table className="w-full text-xs border-t border-b border-slate-200">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left">Item</th>
                <th className="px-3 py-2 text-center w-16">Qty</th>
                <th className="px-3 py-2 text-right w-20">Unit Price</th>
                <th className="px-3 py-2 text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-slate-400"
                  >
                    No line items available.
                  </td>
                </tr>
              ) : (
                items.map((item: any, idx: number) => {
                  // Backend returns: item.product.name, item.price, item.quantity
                  const productName = item.product?.name || item.name || 'Unknown Product';
                  const unitPrice = Number(item.price || item.unitPrice || 0);
                  const quantity = Number(item.quantity || 1);
                  const lineTotal = unitPrice * quantity;

                  console.log(`🧾 Receipt item ${idx}:`, {
                    productName,
                    unitPrice,
                    quantity,
                    lineTotal,
                    item,
                  });

                  return (
                    <tr
                      key={idx}
                      className="border-t border-slate-100"
                    >
                      <td className="px-3 py-2">
                        <div className="font-semibold text-slate-800">
                          {productName}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        {quantity}
                      </td>
                      <td className="px-3 py-2 text-right">
                        ₹{unitPrice.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold">
                        ₹{lineTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className="mt-4 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                ₹{(Number(sale?.subtotal) || Number(totals.subtotal) || Number(totals.total) || 0).toFixed(2)}
              </span>
            </div>
            {typeof sale?.discountAmount === 'number' && sale.discountAmount > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{sale.discountAmount.toFixed(2)}</span>
              </div>
            )}
            {typeof sale?.totalTax === 'number' && sale.totalTax > 0 && (
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{sale.totalTax.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-2 border-dashed border-slate-200" />
            <div className="flex justify-between font-bold text-slate-900">
              <span>TOTAL</span>
              <span>₹{(Number(sale?.totalAmount) || Number(totals.total) || Number(totals.subtotal) || 0).toFixed(2)}</span>
            </div>
          </div>

          {sale?.paymentMethod && (
            <div className="mt-4 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-700">
                  Payment Method:
                </span>{' '}
                {sale.paymentMethod}
              </div>
              {sale?.paymentStatus && (
                <div>
                  <span className="font-semibold text-slate-700">
                    Payment Status:
                  </span>{' '}
                  {sale.paymentStatus}
                </div>
              )}
            </div>
          )}
        </section>

        <aside className="p-6 flex flex-col space-y-4">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-md hover:bg-black"
          >
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>

          <div className="border border-slate-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
              <Mail size={14} />
              <span>Email Receipt</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-100 focus:border-emerald-400"
            />
            <button
              type="button"
              disabled={!email}
              onClick={handleEmailReceipt}
              className="w-full rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-900 disabled:bg-emerald-400"
            >
              Send Email
            </button>
            {emailMessage && (
              <div className="text-[11px] text-slate-600">
                {emailMessage}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate('/cashier/shift-summary')}
            className="inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-800 hover:bg-slate-50"
          >
            <Clock size={14} />
            <span>Shift Summary</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/cashier/terminal')}
            className="mt-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-emerald-500 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-800 hover:bg-emerald-100"
          >
            <ArrowLeft size={14} />
            <span>New Sale</span>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default ReceiptPage;

