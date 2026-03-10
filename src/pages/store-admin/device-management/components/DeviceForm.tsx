import React from 'react';
import { DeviceInformationSection } from './DeviceInformationSection';
import { ConnectionDetailsSection } from './ConnectionDetailsSection';
import { LocationAssignmentSection } from './LocationAssignmentSection';
import { DeviceFormActions } from './DeviceFormActions';
import type { DeviceRegistration, Store } from '../types/device.types';

interface Props {
    formData: DeviceRegistration;
    stores: Store[];
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const DeviceForm: React.FC<Props> = ({ formData, stores, loading, onChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-12">
            <DeviceInformationSection data={formData} onChange={onChange} />
            <ConnectionDetailsSection data={formData} onChange={onChange} />
            <LocationAssignmentSection data={formData} stores={stores} onChange={onChange} />
            <DeviceFormActions loading={loading} />
        </form>
    );
};
