import { Home, Fuel, Wrench, BarChart3, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'refuel', icon: Fuel, label: 'Posto' },
    { id: 'maintenance', icon: Wrench, label: 'Oficina' },
    { id: 'stats', icon: BarChart3, label: 'Dados' },
    { id: 'settings', icon: Settings, label: 'Ajustes' },
];

export function BottomNav() {
    const { activeTab, setActiveTab } = useApp();

    return (
        <div className="fixed bottom-6 w-full max-w-md px-5 z-50 pointer-events-none left-1/2 -translate-x-1/2">
            <nav className="pointer-events-auto glass border theme-border rounded-3xl p-2 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                    : 'theme-text-dim hover:theme-text-secondary'
                                }`}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'mb-0.5' : ''} />
                            {isActive && <span className="text-[9px] font-bold tracking-wide">{tab.label}</span>}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
