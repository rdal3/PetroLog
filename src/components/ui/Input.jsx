export function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-xs font-medium theme-text-muted mb-1.5 ml-1">{label}</label>
            <input
                className="w-full theme-bg-input border theme-border rounded-2xl p-3.5 theme-text outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:opacity-40 text-sm"
                {...props}
            />
        </div>
    );
}
