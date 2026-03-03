import { useApp } from '../../context/AppContext.jsx';
import { Sun, Moon } from 'lucide-react';

export function Header() {
    const { theme, toggleTheme, bikes, activeBike, switchBike } = useApp();

    return (
        <header className="pt-10 pb-4 px-6 sticky top-0 glass z-20 border-b theme-border">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="url(#hg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <defs><linearGradient id="hg" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#fb923c" /><stop offset="100%" stopColor="#ea580c" /></linearGradient></defs>
                        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" /><polygon points="12 15 17 21 7 21 12 15" />
                    </svg>
                    PetroLog
                </h1>
                <div className="flex items-center gap-2">
                    {/* Bike switcher (if multiple) */}
                    {bikes.length > 1 && (
                        <select
                            value={activeBike.id}
                            onChange={e => switchBike(Number(e.target.value))}
                            className="theme-bg-input theme-text border theme-border rounded-xl px-2 py-1.5 text-xs font-medium outline-none focus:border-orange-500/50 max-w-[100px] truncate"
                        >
                            {bikes.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    )}
                    {/* Theme toggle */}
                    <button onClick={toggleTheme} className="p-2 rounded-xl theme-text-muted hover:theme-text transition-colors">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>
        </header>
    );
}
