import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function Modal({ open, onClose, onConfirm, title, message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) setVisible(true);
        else { const t = setTimeout(() => setVisible(false), 200); return () => clearTimeout(t); }
    }, [open]);

    if (!visible && !open) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className={`relative theme-bg-secondary border theme-border rounded-3xl p-6 w-full max-w-sm shadow-2xl transition-all duration-200 ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-500/10 p-2.5 rounded-2xl text-red-400 border border-red-500/20"><AlertTriangle size={20} /></div>
                    <h3 className="text-lg font-bold theme-text">{title}</h3>
                </div>
                <p className="text-sm theme-text-secondary mb-6 leading-relaxed">{message}</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-2xl border theme-border theme-text-secondary font-semibold text-sm hover:opacity-80 transition-colors">Cancelar</button>
                    <button onClick={onConfirm} className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-lg shadow-red-500/20 transition-all active:scale-95">Confirmar</button>
                </div>
            </div>
        </div>
    );
}
