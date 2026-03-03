import React, { createContext, useContext, useState, useMemo, useCallback, useEffect, useRef } from 'react';

const AppContext = createContext(null);

// --- Default bike template ---
function createBike(name = 'Minha Moto', type = 'naked') {
    return {
        id: Date.now(),
        name,
        type,
        tankSize: 14,
        goalKmL: 30,
        refuels: [],
        maintenances: [],
    };
}

const defaultBike = {
    id: 1,
    name: 'Minha Moto',
    type: 'naked',
    tankSize: 14,
    goalKmL: 30,
    refuels: [],
    maintenances: [],
};

function loadFromStorage(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return fallback;
}

function saveToStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
}

// Haptic feedback
function haptic(pattern = [10]) {
    try { navigator?.vibrate?.(pattern); } catch (e) { /* ignore */ }
}

export function AppProvider({ children }) {
    // --- Global state ---
    const [activeTab, setActiveTab] = useState('home');
    const [theme, setTheme] = useState(() => loadFromStorage('mm_theme', 'dark'));
    const [bikes, setBikes] = useState(() => loadFromStorage('mm_bikes', [defaultBike]));
    const [activeBikeId, setActiveBikeId] = useState(() => loadFromStorage('mm_activeBikeId', 1));
    const [onboardingDone, setOnboardingDone] = useState(() => loadFromStorage('mm_onboarding', false));
    const [toasts, setToasts] = useState([]);
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => loadFromStorage('mm_notifications', false));

    // Persist
    useEffect(() => { saveToStorage('mm_theme', theme); }, [theme]);
    useEffect(() => { saveToStorage('mm_bikes', bikes); }, [bikes]);
    useEffect(() => { saveToStorage('mm_activeBikeId', activeBikeId); }, [activeBikeId]);
    useEffect(() => { saveToStorage('mm_onboarding', onboardingDone); }, [onboardingDone]);
    useEffect(() => { saveToStorage('mm_notifications', notificationsEnabled); }, [notificationsEnabled]);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    // --- Active bike ---
    const activeBike = useMemo(() => bikes.find(b => b.id === activeBikeId) || bikes[0], [bikes, activeBikeId]);

    // Helper to update the active bike's data
    const updateActiveBike = useCallback((updater) => {
        setBikes(prev => prev.map(b => b.id === activeBikeId ? (typeof updater === 'function' ? updater(b) : { ...b, ...updater }) : b));
    }, [activeBikeId]);

    // --- Toast system ---
    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        haptic();
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    // --- Computed values ---
    const currentOdometer = useMemo(() => {
        const maxRefuel = Math.max(...(activeBike.refuels || []).map(r => r.odometer), 0);
        const maxMaint = Math.max(...(activeBike.maintenances || []).map(m => m.odometer), 0);
        return Math.max(maxRefuel, maxMaint);
    }, [activeBike]);

    const consumptionStats = useMemo(() => {
        const refuels = activeBike.refuels || [];
        const sorted = [...refuels].sort((a, b) => a.odometer - b.odometer);
        const data = [];
        let lastFullRefuel = null;
        let accumulatedLiters = 0;
        let totalDistOverall = 0;
        let totalLitersOverall = 0;
        let totalCostFuel = 0;

        for (const r of sorted) {
            totalCostFuel += r.cost;
            if (!lastFullRefuel) { if (r.fullTank) lastFullRefuel = r; continue; }
            accumulatedLiters += r.liters;
            if (r.fullTank) {
                const dist = r.odometer - lastFullRefuel.odometer;
                const cons = dist / accumulatedLiters;
                totalDistOverall += dist;
                totalLitersOverall += accumulatedLiters;
                data.push({
                    id: r.id,
                    data: new Date(r.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
                    consumo: parseFloat(cons.toFixed(1)),
                    distancia: dist,
                    litersUsed: accumulatedLiters,
                    custoLitro: parseFloat((r.cost / r.liters).toFixed(2)),
                });
                lastFullRefuel = r;
                accumulatedLiters = 0;
            }
        }

        const refuelsWithStats = sorted.map(r => {
            const stat = data.find(d => d.id === r.id);
            return { ...r, consumoCalculado: stat?.consumo ?? null, distanciaCalculada: stat?.distancia ?? null, custoLitro: parseFloat((r.cost / r.liters).toFixed(2)) };
        }).reverse();

        const avg = totalLitersOverall > 0 ? parseFloat((totalDistOverall / totalLitersOverall).toFixed(1)) : 0;

        return { avg, data, totalDistOverall, totalCostFuel, totalLitersOverall: parseFloat(totalLitersOverall.toFixed(1)), refuelsList: refuelsWithStats };
    }, [activeBike.refuels]);

    const totalCostMaintenance = useMemo(() => (activeBike.maintenances || []).reduce((a, m) => a + m.cost, 0), [activeBike.maintenances]);

    // Cost per km
    const costPerKm = useMemo(() => {
        const totalDist = consumptionStats.totalDistOverall;
        if (totalDist <= 0) return 0;
        return parseFloat(((consumptionStats.totalCostFuel + totalCostMaintenance) / totalDist).toFixed(2));
    }, [consumptionStats, totalCostMaintenance]);

    // Autonomy projection
    const autonomyProjection = useMemo(() => {
        const avg = consumptionStats.avg;
        const tankSize = activeBike.tankSize || 14;
        if (avg <= 0) return { full: 0, remaining: 0 };
        const fullRange = Math.round(avg * tankSize);
        // Estimate remaining fuel: last refuel was partial or full
        const refuels = activeBike.refuels || [];
        const lastRefuel = [...refuels].sort((a, b) => b.odometer - a.odometer)[0];
        if (!lastRefuel) return { full: fullRange, remaining: 0 };
        const distSinceLast = currentOdometer - lastRefuel.odometer;
        const estimatedUsed = distSinceLast / avg;
        const estimatedRemaining = Math.max(0, (lastRefuel.fullTank ? tankSize : lastRefuel.liters) - estimatedUsed);
        const remainingKm = Math.round(estimatedRemaining * avg);
        return { full: fullRange, remaining: Math.max(0, remainingKm) };
    }, [consumptionStats.avg, activeBike, currentOdometer]);

    // Monthly cost data
    const monthlyData = useMemo(() => {
        const refuels = activeBike.refuels || [];
        const maints = activeBike.maintenances || [];
        const months = {};

        refuels.forEach(r => {
            const key = r.date.substring(0, 7); // YYYY-MM
            if (!months[key]) months[key] = { mes: '', combustivel: 0, manutencao: 0 };
            months[key].combustivel += r.cost;
        });
        maints.forEach(m => {
            const key = m.date.substring(0, 7);
            if (!months[key]) months[key] = { mes: '', combustivel: 0, manutencao: 0 };
            months[key].manutencao += m.cost;
        });

        return Object.entries(months)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, val]) => {
                const [y, m] = key.split('-');
                const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                return { ...val, mes: `${monthNames[parseInt(m) - 1]}/${y.slice(2)}` };
            });
    }, [activeBike.refuels, activeBike.maintenances]);

    // Upcoming maintenance
    const upcomingMaintenance = useMemo(() => {
        return (activeBike.maintenances || [])
            .filter(m => m.nextOdometer)
            .map(m => ({ ...m, kmRemaining: m.nextOdometer - currentOdometer }))
            .sort((a, b) => a.kmRemaining - b.kmRemaining)
            .slice(0, 5);
    }, [activeBike.maintenances, currentOdometer]);

    // --- CRUD ---
    const addRefuel = useCallback((data) => {
        const newRefuel = { id: Date.now(), ...data };
        updateActiveBike(bike => ({ ...bike, refuels: [...bike.refuels, newRefuel] }));
        showToast('Abastecimento registrado!');
        haptic([15, 50, 15]);
    }, [updateActiveBike, showToast]);

    const deleteRefuel = useCallback((id) => {
        updateActiveBike(bike => ({ ...bike, refuels: bike.refuels.filter(r => r.id !== id) }));
        showToast('Abastecimento removido', 'info');
    }, [updateActiveBike, showToast]);

    const addMaintenance = useCallback((data) => {
        const newMaint = { id: Date.now(), ...data };
        updateActiveBike(bike => ({ ...bike, maintenances: [...bike.maintenances, newMaint] }));
        showToast('Manutenção registrada!');
        haptic([15, 50, 15]);
    }, [updateActiveBike, showToast]);

    const deleteMaintenance = useCallback((id) => {
        updateActiveBike(bike => ({ ...bike, maintenances: bike.maintenances.filter(m => m.id !== id) }));
        showToast('Manutenção removida', 'info');
    }, [updateActiveBike, showToast]);

    // --- Multi-bike ---
    const addBike = useCallback((name, type) => {
        const newBike = createBike(name, type);
        setBikes(prev => [...prev, newBike]);
        setActiveBikeId(newBike.id);
        showToast(`"${name}" adicionada à garagem!`);
    }, [showToast]);

    const deleteBike = useCallback((id) => {
        setBikes(prev => {
            const next = prev.filter(b => b.id !== id);
            if (next.length === 0) {
                next.push(createBike());
            }
            if (activeBikeId === id) setActiveBikeId(next[0].id);
            return next;
        });
        showToast('Moto removida da garagem', 'info');
    }, [activeBikeId, showToast]);

    const switchBike = useCallback((id) => {
        setActiveBikeId(id);
    }, []);

    // --- Bike settings ---
    const updateBikeSettings = useCallback((settings) => {
        updateActiveBike(settings);
    }, [updateActiveBike]);

    // --- Export/Import ---
    const exportData = useCallback(() => {
        const data = { bikes, activeBikeId, theme, exportedAt: new Date().toISOString(), version: '2.0.0' };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `petrolog-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Backup exportado!');
    }, [bikes, activeBikeId, theme, showToast]);

    const importData = useCallback((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                // v2 format (multi-bike)
                if (data.bikes) {
                    setBikes(data.bikes);
                    if (data.activeBikeId) setActiveBikeId(data.activeBikeId);
                    if (data.theme) setTheme(data.theme);
                }
                // v1 format (single bike) - backwards compatible
                else if (data.refuels) {
                    const migrated = { ...defaultBike, refuels: data.refuels, maintenances: data.maintenances || [], name: data.bikeName || 'Minha Moto', type: data.bikeType || 'naked' };
                    setBikes([migrated]);
                    setActiveBikeId(migrated.id);
                }
                showToast('Backup importado com sucesso!');
            } catch { showToast('Erro ao importar arquivo', 'error'); }
        };
        reader.readAsText(file);
    }, [showToast]);

    const resetData = useCallback(() => {
        setBikes([{ ...defaultBike, id: Date.now() }]);
        setActiveBikeId(null);
        setTimeout(() => setBikes(prev => { setActiveBikeId(prev[0].id); return prev; }), 0);
        setTheme('dark');
        showToast('Dados resetados', 'info');
    }, [showToast]);

    // --- Notifications ---
    const requestNotifications = useCallback(async () => {
        try {
            if (!('Notification' in window)) { showToast('Seu navegador não suporta notificações', 'error'); return; }
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationsEnabled(true);
                showToast('Notificações ativadas!');
            } else {
                showToast('Permissão negada', 'error');
            }
        } catch { showToast('Erro ao solicitar permissão', 'error'); }
    }, [showToast]);

    // Check maintenance and fire notification
    useEffect(() => {
        if (!notificationsEnabled || !('Notification' in window) || Notification.permission !== 'granted') return;
        const urgent = upcomingMaintenance.filter(m => m.kmRemaining <= 500 && m.kmRemaining > -500);
        if (urgent.length > 0) {
            const lastNotif = loadFromStorage('mm_lastNotif', 0);
            const now = Date.now();
            // Fire at most once per hour
            if (now - lastNotif > 3600000) {
                saveToStorage('mm_lastNotif', now);
                new Notification('🔧 PetroLog - Atenção!', {
                    body: `${urgent[0].type}: ${urgent[0].kmRemaining > 0 ? `faltam ${urgent[0].kmRemaining} km` : 'passou do prazo!'}`,
                    icon: '/favicon.svg',
                });
            }
        }
    }, [notificationsEnabled, upcomingMaintenance]);

    const value = {
        activeTab, setActiveTab,
        theme, toggleTheme,
        bikes, activeBike, activeBikeId,
        addBike, deleteBike, switchBike, updateBikeSettings,
        currentOdometer, consumptionStats, totalCostMaintenance,
        costPerKm, autonomyProjection, monthlyData,
        upcomingMaintenance,
        addRefuel, deleteRefuel, addMaintenance, deleteMaintenance,
        exportData, importData, resetData,
        onboardingDone, setOnboardingDone,
        notificationsEnabled, requestNotifications,
        toasts, showToast,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
