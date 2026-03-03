import { useApp } from './context/AppContext.jsx';
import { Header } from './components/layout/Header.jsx';
import { BottomNav } from './components/layout/BottomNav.jsx';
import { ToastContainer } from './components/ui/Toast.jsx';
import { Onboarding } from './components/ui/Onboarding.jsx';
import { HomeView } from './views/HomeView.jsx';
import { RefuelView } from './views/RefuelView.jsx';
import { MaintenanceView } from './views/MaintenanceView.jsx';
import { StatsView } from './views/StatsView.jsx';
import { SettingsView } from './views/SettingsView.jsx';

const views = {
    home: HomeView,
    refuel: RefuelView,
    maintenance: MaintenanceView,
    stats: StatsView,
    settings: SettingsView,
};

export default function App() {
    const { activeTab, onboardingDone } = useApp();
    const ActiveView = views[activeTab] || HomeView;

    if (!onboardingDone) {
        return <Onboarding />;
    }

    return (
        <div className="min-h-screen theme-bg font-sans theme-text flex justify-center selection:bg-orange-500/30">
            <div className="w-full max-w-md theme-bg min-h-screen relative flex flex-col mx-auto border-x theme-border shadow-2xl overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto px-5 py-6 scroll-smooth">
                    <ActiveView />
                </main>
                <BottomNav />
            </div>
            <ToastContainer />
        </div>
    );
}
