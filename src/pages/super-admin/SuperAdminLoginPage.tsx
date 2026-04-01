import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import FormWrapper from '../../components/shared/admin/FormWrapper';
import InputField from '../../components/shared/admin/InputField';
import PasswordInput from '../../components/shared/admin/PasswordInput';
import SubmitButton from '../../components/shared/admin/SubmitButton';
import { KeyRound, ShieldCheck } from 'lucide-react';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SuperAdminLoginPage: React.FC = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Redirect path after login
    const from = location.state?.from?.pathname || '/super-admin/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data: any) => {
        const result = await login(data);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError('root', { message: result.message });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafc] p-6 selection:bg-indigo-100 selection:text-indigo-900">
            <div className="w-full max-w-lg space-y-12">
                {/* Brand Header */}
                <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex w-16 h-16 bg-[#1a192b] text-white rounded-[2.5rem] items-center justify-center shadow-3xl shadow-indigo-900/20 mb-6 rotate-2 hover:rotate-0 transition-transform duration-500">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic translate-y-2">Antigravity Console</h1>
                </div>

                <FormWrapper 
                    title="Authorized Access Only" 
                    subtitle="Network Administrator Authentication Protocol"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
                        {errors.root && (
                            <div className="p-5 bg-rose-50 border-2 border-rose-100 rounded-3xl text-rose-600 text-xs font-black uppercase tracking-widest animate-in fade-in zoom-in text-center">
                                {errors.root.message}
                            </div>
                        )}

                        <InputField
                            label="Security ID (Email)"
                            placeholder="admin@antigravity.io"
                            type="email"
                            registration={register('email')}
                            error={errors.email?.message}
                            autoComplete="email"
                        />

                        <PasswordInput
                            label="Access Cipher"
                            placeholder="••••••••"
                            registration={register('password')}
                            error={errors.password?.message}
                            autoComplete="current-password"
                        />

                        <div className="pt-4 flex flex-col gap-6">
                            <SubmitButton 
                                isLoading={isSubmitting} 
                                icon={<KeyRound size={20} />}
                                loadingText="Authenticating..."
                            >
                                Unlock Console
                            </SubmitButton>
                            
                            <p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-[3px]">
                                Secured by Hardware-Level Encryption
                            </p>
                        </div>
                    </form>
                </FormWrapper>
            </div>
        </div>
    );
};

export default SuperAdminLoginPage;
