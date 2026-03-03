export function EmptyState({ icon: Icon, title, message }) {
    return (
        <div className="theme-bg-card p-10 rounded-3xl border theme-border text-center flex flex-col items-center animate-fade-in">
            <div className="bg-zinc-500/10 p-4 rounded-full mb-4 theme-text-dim"><Icon size={40} /></div>
            <h3 className="theme-text font-bold mb-2">{title}</h3>
            <p className="text-sm theme-text-muted leading-relaxed max-w-[250px]">{message}</p>
        </div>
    );
}
