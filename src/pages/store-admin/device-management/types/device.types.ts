export interface DeviceRegistration {
    deviceName: string;
    serialNumber: string;
    deviceType: 'POS Terminal' | 'Self Checkout' | 'Mobile POS' | 'Kiosk';
    ipAddress: string;
    scannerConnection: 'USB' | 'Bluetooth' | 'Network' | 'None';
    printerType: 'Thermal 80mm' | 'Thermal 58mm' | 'Network Printer' | 'None';
    assignedStore: string;
    assignedStation: string;
}

export interface Store {
    id: string;
    storeName: string;
    branchCode?: string;
}
