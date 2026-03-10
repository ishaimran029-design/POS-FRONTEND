import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerDevice, fetchStores } from '@/api/device.api';
import type { DeviceRegistration, Store } from '../types/device.types';

export const useRegisterDevice = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState<Store[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<DeviceRegistration>({
        deviceName: '',
        serialNumber: '',
        deviceType: 'POS Terminal',
        ipAddress: '',
        scannerConnection: 'None',
        printerType: 'None',
        assignedStore: '',
        assignedStation: ''
    });

    useEffect(() => {
        const loadStores = async () => {
            try {
                const response = await fetchStores();
                if (response.data.success) {
                    setStores(response.data.data);
                    // Auto-select first store if available
                    if (response.data.data.length > 0) {
                        setFormData(prev => ({ ...prev, assignedStore: response.data.data[0].id }));
                    }
                }
            } catch (err) {
                console.error('Failed to fetch stores:', err);
            }
        };
        loadStores();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!formData.deviceName) return 'Device name is required';
        if (!formData.serialNumber) return 'Serial number is required';
        if (!formData.assignedStore) return 'Store assignment is required';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Map frontend data to backend expectation if needed
            const payload = {
                deviceName: formData.deviceName,
                deviceType: formData.deviceType,
                serialNumber: formData.serialNumber,
                ipAddress: formData.ipAddress,
                barcodeScanner: formData.scannerConnection !== 'None',
                scannerType: formData.scannerConnection === 'Bluetooth' ? 'BLUETOOTH' :
                    formData.scannerConnection === 'USB' ? 'USB' : null,
                // Add other metadata as needed
                metadata: {
                    printerType: formData.printerType,
                    assignedStation: formData.assignedStation,
                    assignedStoreId: formData.assignedStore
                }
            };

            const response = await registerDevice(payload);
            if (response.data.success) {
                navigate('/store-admin/devices');
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        stores,
        error,
        handleChange,
        handleSubmit,
        setFormData
    };
};
