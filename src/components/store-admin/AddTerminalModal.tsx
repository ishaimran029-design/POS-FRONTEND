import React, { useEffect, useState } from 'react';
import { X, Monitor, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { terminalsApi } from '../../service/api';
import { getDeviceFingerprint } from '../../utils/fingerprint';

interface AddTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTerminalModal({ isOpen, onClose, onSuccess }: AddTerminalModalProps) {
  const [step, setStep] = useState<'loading' | 'check' | 'already' | 'form' | 'success' | 'error'>('loading');
  const [terminalName, setTerminalName] = useState('');
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [existingName, setExistingName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep('loading');
    setError(null);
    setTerminalName('');
    setExistingName('');
    setFingerprint(null);

    const run = async () => {
      try {
        const fp = await getDeviceFingerprint();
        setFingerprint(fp);
        const res = await terminalsApi.check(fp);
        const data = res.data?.data;
        if (data?.registered && data?.terminal) {
          setExistingName(data.terminal.deviceName);
          setStep('already');
        } else {
          setStep('form');
        }
      } catch (err) {
        setStep('error');
        setError((err as any)?.response?.data?.message || 'Failed to check device');
      }
    };
    run();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fingerprint || !terminalName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await terminalsApi.register({
        terminalName: terminalName.trim(),
        deviceFingerprint: fingerprint,
      });
      const data = res.data?.data;
      if (data?.alreadyRegistered) {
        setExistingName(data.terminal?.deviceName || 'Unknown');
        setStep('already');
      } else {
        setStep('success');
        onSuccess();
      }
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'Failed to register terminal');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('loading');
    setTerminalName('');
    setExistingName('');
    setFingerprint(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={handleClose} />
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New Terminal</h2>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Register this device</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'loading' && (
            <div className="py-12 flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
              <p className="text-sm font-medium text-slate-600">Reading device fingerprint...</p>
            </div>
          )}

          {step === 'already' && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Already Registered</h3>
              <p className="text-slate-600 font-medium">
                This device is already registered as: <span className="font-black text-indigo-600">{existingName}</span>
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                Close
              </button>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                  Terminal Name
                </label>
                <input
                  type="text"
                  value={terminalName}
                  onChange={(e) => setTerminalName(e.target.value)}
                  placeholder="e.g. Counter 1"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 outline-none font-medium"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Register Terminal
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Terminal Registered</h3>
              <p className="text-slate-600 font-medium">
                Successfully registered as <span className="font-bold text-indigo-600">{terminalName || 'Terminal'}</span>
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="py-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Error</h3>
              <p className="text-slate-600 font-medium mb-6">{error}</p>
              <button onClick={handleClose} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
