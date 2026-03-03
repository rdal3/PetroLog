import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const typeConfig = {
    success: { icon: CheckCircle2, bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    info: { icon: Info, bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-400' },
    error: { icon: AlertTriangle, bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-400' },
};

export function ToastContainer() {
    const { toasts } = useApp();

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
            {toasts.map(toast => {
                const config = typeConfig[toast.type] || typeConfig.success;
                const Icon = config.icon;
                return (
                    <div
                        key={toast.id}
                        className={`animate-toast-in pointer-events-auto ${config.bg} ${config.border} border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl backdrop-blur-xl`}
                    >
                        <Icon size={18} className={config.text} />
                        <span className={`text-sm font-medium ${config.text}`}>{toast.message}</span>
                    </div>
                );
            })}
        </div>
    );
}
