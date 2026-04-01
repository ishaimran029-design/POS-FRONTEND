export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const container = document.getElementById('admin-toasts');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-white border-2 ${
        type === 'success' ? 'border-emerald-500/20 text-emerald-600' : 'border-rose-500/20 text-rose-600'
    } shadow-2xl shadow-slate-200/50 pointer-events-auto transform transition-all duration-500 translate-x-12 opacity-0 font-black text-xs uppercase tracking-widest`;
    
    toast.innerHTML = `
        <div class="w-8 h-8 rounded-full ${type === 'success' ? 'bg-emerald-50' : 'bg-rose-50'} flex items-center justify-center">
            ${type === 'success' ? '✓' : '✖'}
        </div>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 10);

    // Remove
    setTimeout(() => {
        toast.style.transform = 'translateX(12px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
};
