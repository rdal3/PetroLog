export function Toggle({ checked, onChange, label, description }) {
    return (
        <div
            className="flex items-center justify-between p-4 rounded-2xl border theme-border theme-bg-input cursor-pointer transition-colors hover:opacity-90"
            onClick={onChange}
        >
            <div>
                <h4 className="text-sm font-semibold theme-text">{label}</h4>
                {description && <p className="text-[10px] theme-text-dim mt-0.5 leading-tight">{description}</p>}
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center ${checked ? 'bg-orange-500' : 'bg-zinc-500/30'}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
        </div>
    );
}
