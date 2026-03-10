export interface Product {
    id: string;
    name: string;
    sku: string;
    unitsSold: number;
    revenue: number;
    stockLevel: number;
}

export interface Device {
    id: string;
    name: string;
    location: string;
    status: 'online' | 'offline';
}
