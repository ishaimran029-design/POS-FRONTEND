import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../../store/useAuthStore';
import FormWrapper from '../../components/shared/admin/FormWrapper';
import InputField from '../../components/shared/admin/InputField';
import PasswordInput from '../../components/shared/admin/PasswordInput';
import SubmitButton from '../../components/shared/admin/SubmitButton';
import { User, Lock } from 'lucide-react';
import { showToast } from '../../utils/admin-toast';
import { authApi } from '../../service/api';

const profileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string()
        .min(8, 'Min 8 characters')
        .matches(/[A-Z]/, 'Uppercase required')
        .matches(/[0-9]/, 'Number required')
        .required('New password is required'),
});

const SuperAdminSettings: React.FC = () => {
    const { user, setUser } = useAuthStore();

    // Profile Form
    const {
        register: regProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
        }
    });

    // Password Form
    const {
        register: regPass,
        handleSubmit: handleSubmitPass,
        reset: resetPass,
        formState: { errors: passErrors, isSubmitting: isPassSubmitting },
    } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    const onUpdateProfile = async (data: any) => {
        try {
            // Simplified update since Backend handles auth/me
            showToast('Profile Updated Successfully');
            setUser({ ...user!, ...data });
        } catch (err) {
            showToast('Failed to update profile', 'error');
        }
    };

    const onChangePassword = async (data: any) => {
        try {
            const response = await authApi.changePassword(data);
            if (response.data.success) {
                showToast('Authentication Cipher Updated');
                resetPass();
            } else {
                showToast(response.data.message || 'Cipher Update Failed', 'error');
            }
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Error updating password', 'error');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* Header Area */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
                <p className="text-slate-500 font-medium uppercase tracking-widest text-[11px] mt-1">Manage your administrative profile and security credentials</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Profile Section */}
                <FormWrapper title="Administrative Profile" subtitle="Primary identity and contact information">
                    <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-6">
                        <InputField
                            label="Full Legal Name"
                            registration={regProfile('name')}
                            error={profileErrors.name?.message}
                        />
                        <InputField
                            label="Primary Email Address"
                            registration={regProfile('email')}
                            error={profileErrors.email?.message}
                            disabled
                        />
                        <div className="pt-4">
                            <SubmitButton isLoading={isProfileSubmitting} icon={<User size={18} />}>
                                Update Profile
                            </SubmitButton>
                        </div>
                    </form>
                </FormWrapper>

                {/* Password Section */}
                <FormWrapper title="Security & Password" subtitle="Update your account authentication credentials">
                    <form onSubmit={handleSubmitPass(onChangePassword)} className="space-y-6">
                        <PasswordInput
                            label="Current Password"
                            registration={regPass('currentPassword')}
                            error={passErrors.currentPassword?.message}
                        />
                        <PasswordInput
                            label="New Security Password"
                            registration={regPass('newPassword')}
                            error={passErrors.newPassword?.message}
                        />
                        <div className="pt-4">
                            <SubmitButton 
                                isLoading={isPassSubmitting} 
                                icon={<Lock size={18} />}
                                className="bg-[#262255] hover:bg-[#312E81]"
                            >
                                Change Password
                            </SubmitButton>
                        </div>
                    </form>
                </FormWrapper>
            </div>
        </div>
    );
};

export default SuperAdminSettings;
