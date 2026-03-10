import React from 'react';
import { Monitor, WifiOff } from 'lucide-react';

interface DeviceStatusIndicatorProps {
  deviceId: string | null;
  deviceName: string | null;
  isOnline?: boolean;
}

/**
 * Device Status Indicator - Shows current device connection status
 * 
 * Visual indicators:
 * - Green + Checkmark = Device connected
 * - Red + X = No device
 */
const DeviceStatusIndicator: React.FC<DeviceStatusIndicatorProps> = ({
  deviceId,
  deviceName,
}) => {
  if (!deviceId || !deviceName) {
    return (
      <div className="flex items-center space-x-2 rounded-full bg-red-50 px-3 py-1.5 border border-red-200">
        <WifiOff size={16} className="text-red-500" />
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-red-700">
            No Device
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 rounded-full bg-emerald-50 px-3 py-1.5 border border-emerald-200">
      <Monitor size={16} className="text-emerald-500" />
      <div className="flex items-center space-x-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <div className="text-left hidden sm:block">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
            Connected
          </p>
          <p className="text-xs font-semibold text-emerald-900 truncate max-w-[150px]">
            {deviceName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusIndicator;
