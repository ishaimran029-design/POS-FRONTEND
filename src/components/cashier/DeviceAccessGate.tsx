import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  LogOut, 
  Loader2, 
  Monitor, 
  RefreshCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { devicesApi } from '../../service/api';
import { useDeviceStore } from '../../store/useDeviceStore';
import { useAuthStore } from '../../store/useAuthStore';

type Device = {
  id: string;
  deviceName: string;
  deviceType?: string;
  isActive: boolean;
  lastActiveAt?: string;
};

interface DeviceAccessGateProps {
  children: React.ReactNode;
}

/**
 * Device Access Gate - Cashier POS
 * 
 * A blocking modal that prevents POS access until a device is connected.
 * 
 * Behaviour & API:
 * - On Mount: GET /devices?isActive=true to check for available devices
 * - Polls every 5 seconds for newly available devices
 * - Shows blocking popup if no device connected
 * - Only action: Logout button
 * - Auto-closes when device becomes available
 */
const DeviceAccessGate: React.FC<DeviceAccessGateProps> = ({ children }) => {
  const navigate = useNavigate();
  const { deviceId, deviceName, setDevice } = useDeviceStore();
  const { logout, user } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [hasDevice, setHasDevice] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  /**
   * Fetch available devices from API
   */
  const loadAvailableDevices = useCallback(async () => {
    try {
      const res = await devicesApi.getAll();
      if (res.data?.success) {
        const allDevices = (res.data.data?.devices || res.data.data || []) as Device[];
        
        // Filter: Only active devices
        const activeDevices = allDevices.filter((d) => d.isActive);
        
        setAvailableDevices(activeDevices);
        setLastChecked(new Date());
        
        // If we have a deviceId but it's no longer available, clear it
        if (deviceId && !activeDevices.find((d) => d.id === deviceId)) {
          console.warn('[DeviceGate] Current device no longer available');
        }
        
        // Auto-select if only one device available
        if (activeDevices.length === 1 && !deviceId) {
          console.log('[DeviceGate] Auto-selecting single available device');
          handleSelectDevice(activeDevices[0]);
        }
      }
    } catch (err: any) {
      console.error('[DeviceGate] Failed to load devices:', err);
      setError(err.response?.data?.message || 'Failed to check device availability');
    } finally {
      setIsLoading(false);
    }
  }, [deviceId]);

  /**
   * Handle device selection
   */
  const handleSelectDevice = async (device: Device) => {
    setIsSelecting(true);
    setError(null);
    try {
      // Heartbeat to attach cashier to terminal
      await devicesApi.heartbeat(device.id);

      // Save device to persistent store
      setDevice({
        deviceId: device.id,
        deviceName: device.deviceName || 'POS Terminal',
        lastHeartbeatAt: new Date().toISOString(),
      });

      setHasDevice(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to connect to device');
    } finally {
      setIsSelecting(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  /**
   * Initial load and polling
   */
  useEffect(() => {
    // Check if already has device
    if (deviceId) {
      setHasDevice(true);
      setIsLoading(false);
      return;
    }

    // Load available devices
    loadAvailableDevices();

    // Poll every 5 seconds for newly available devices
    const pollInterval = setInterval(() => {
      if (!deviceId) {
        loadAvailableDevices();
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [deviceId, loadAvailableDevices]);

  /**
   * Update hasDevice state when deviceId changes
   */
  useEffect(() => {
    if (deviceId) {
      setHasDevice(true);
    }
  }, [deviceId]);

  // If device is connected, render children (POS content)
  if (hasDevice && deviceId) {
    return <>{children}</>;
  }

  // Show blocking modal
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop - cannot click outside */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="rounded-3xl border border-amber-200 bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">
                    Device Required
                  </h2>
                  <p className="text-xs font-medium text-white/80">
                    Connect to a POS terminal to continue
                  </p>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center space-x-1.5 rounded-full bg-white/20 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  No Device
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              /* Loading State */
              <div className="flex flex-col items-center py-8">
                <Loader2 size={40} className="text-amber-500 animate-spin mb-4" />
                <p className="text-sm font-semibold text-slate-700">
                  Checking for available devices...
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Please wait while we search for POS terminals
                </p>
              </div>
            ) : error ? (
              /* Error State */
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-900">Connection Error</p>
                    <p className="text-xs text-red-700 mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={loadAvailableDevices}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900 hover:bg-amber-100 transition-all"
                >
                  <RefreshCcw size={16} />
                  <span>Retry</span>
                </button>
              </div>
            ) : availableDevices.length === 0 ? (
              /* No Devices Available */
              <div className="space-y-6">
                <div className="text-center py-4">
                  <div className="inline-flex rounded-full bg-amber-100 p-4 text-amber-600 mb-4">
                    <Monitor size={32} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    No Active Devices Available
                  </h3>
                  <p className="text-sm font-medium text-slate-600">
                    There are currently no POS terminals available for connection.
                    Please contact your store administrator to activate a device.
                  </p>
                </div>

                {/* Info Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle size={18} className="text-slate-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-600">
                      <p className="font-bold mb-1">Why am I seeing this?</p>
                      <p>
                        All POS terminals are either offline, inactive, or already in use by other cashiers.
                        You cannot access the POS system without a connected device.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Checked */}
                <div className="text-center text-xs text-slate-500">
                  <p>
                    Last checked: <span className="font-medium">{lastChecked.toLocaleTimeString()}</span>
                  </p>
                  <p className="mt-1">
                    Automatically checking every 5 seconds...
                  </p>
                </div>
              </div>
            ) : (
              /* Devices Available - Show Selection */
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                  <Monitor size={18} className="text-emerald-600" />
                  <span>Select a POS Terminal</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableDevices.map((device) => (
                    <button
                      key={device.id}
                      disabled={isSelecting}
                      onClick={() => handleSelectDevice(device)}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          <Monitor size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-900">
                            {device.deviceName || 'POS Terminal'}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {device.deviceType || 'POS'} • {device.id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      {isSelecting ? (
                        <Loader2 size={18} className="text-emerald-500 animate-spin" />
                      ) : (
                        <div className="flex items-center space-x-1 text-emerald-600">
                          <CheckCircle2 size={18} />
                          <span className="text-xs font-bold">Select</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - Logout Button (always visible) */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                {user && (
                  <span>
                    Logged in as <span className="font-semibold text-slate-700">{user.name || user.email}</span>
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                disabled={isSelecting || isLoading}
                className="inline-flex items-center space-x-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Help Text Below Modal */}
        <div className="text-center mt-4">
          <p className="text-xs text-white/60">
            You cannot access the POS system without connecting to a device
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceAccessGate;
