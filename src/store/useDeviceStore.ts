
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DeviceState = {
  deviceId: string | null;
  deviceName: string | null;
  lastHeartbeatAt: string | null;
  setDevice: (payload: { deviceId: string; deviceName?: string | null; lastHeartbeatAt?: string | null }) => void;
  clearDevice: () => void;
};

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      deviceId: null,
      deviceName: null,
      lastHeartbeatAt: null,
      setDevice: ({ deviceId, deviceName = null, lastHeartbeatAt = null }) =>
        set({ deviceId, deviceName, lastHeartbeatAt }),
      clearDevice: () => set({ deviceId: null, deviceName: null, lastHeartbeatAt: null }),
    }),
    {
      name: 'cashier-device',
      partialize: (state) => ({
        deviceId: state.deviceId,
        deviceName: state.deviceName,
        lastHeartbeatAt: state.lastHeartbeatAt,
      }),
    }
  )
);

