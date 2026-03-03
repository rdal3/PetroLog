import { TrendingUp, Wrench, ChevronRight, AlertTriangle, CheckCircle2, Gauge, Fuel as FuelIcon } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { BikeGraphics } from '../components/bikes/BikeGraphics.jsx';
import { useApp } from '../context/AppContext.jsx';

export function HomeView() {
    const {
        activeBike, currentOdometer,
        consumptionStats, upcomingMaintenance,
        totalCostMaintenance, costPerKm, autonomyProjection,
        setActiveTab,
    } = useApp();

    const totalSpent = consumptionStats.totalCostFuel + totalCostMaintenance;

    return (
        <div className="space-y-6 pb-safe animate-fade-in">

            {/* Garage Header */}
            <Card className="relative overflow-hidden !bg-gradient-to-br !border-opacity-60">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <TrendingUp size={120} />
                </div>

                <div className="flex justify-between items-start mb-2 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold theme-text tracking-tight">{activeBike.name}</h2>
                        <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full theme-bg-input border theme-border">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium theme-text-secondary">{currentOdometer.toLocaleString('pt-BR')} km</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center py-6 relative z-10">
                    <div className="w-64 transition-all duration-500 hover:scale-105">
                        {BikeGraphics[activeBike.type]}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2 relative z-10">
                    <div className="theme-bg-input rounded-2xl p-3.5 border theme-border flex flex-col justify-center">
                        <p className="theme-text-dim text-[10px] uppercase tracking-wider font-bold mb-0.5">Consumo Médio</p>
                        <p className="text-xl font-bold text-emerald-400">
                            {consumptionStats.avg > 0 ? consumptionStats.avg : '--'} <span className="text-xs font-medium theme-text-dim">km/l</span>
                        </p>
                    </div>
                    <div className="theme-bg-input rounded-2xl p-3.5 border theme-border flex flex-col justify-center">
                        <p className="theme-text-dim text-[10px] uppercase tracking-wider font-bold mb-0.5">Distância Registrada</p>
                        <p className="text-xl font-bold text-orange-400">
                            {consumptionStats.totalDistOverall.toLocaleString('pt-BR')} <span className="text-xs font-medium theme-text-dim">km</span>
                        </p>
                    </div>
                </div>
            </Card>

            {/* Autonomy + Cost/km */}
            {consumptionStats.avg > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    <Card className="p-3.5 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-1 mb-1">
                            <Gauge size={12} className="text-blue-400" />
                            <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim">Autonomia</p>
                        </div>
                        <p className="text-lg font-bold text-blue-400">~{autonomyProjection.remaining} <span className="text-[10px] theme-text-dim">km rest.</span></p>
                        <p className="text-[10px] theme-text-dim mt-0.5">Tanque cheio: ~{autonomyProjection.full} km</p>
                    </Card>
                    <Card className="p-3.5 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-1 mb-1">
                            <FuelIcon size={12} className="text-purple-400" />
                            <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim">Custo/km</p>
                        </div>
                        <p className="text-lg font-bold text-purple-400">R$ {costPerKm} <span className="text-[10px] theme-text-dim">/km</span></p>
                        <p className="text-[10px] theme-text-dim mt-0.5">Combustível + manutenção</p>
                    </Card>
                </div>
            )}

            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-3">
                <Card className="p-3.5 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim mb-1">Combustível</p>
                    <p className="text-sm font-bold text-emerald-400">R$ {consumptionStats.totalCostFuel.toFixed(0)}</p>
                </Card>
                <Card className="p-3.5 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim mb-1">Manutenção</p>
                    <p className="text-sm font-bold text-orange-400">R$ {totalCostMaintenance.toFixed(0)}</p>
                </Card>
                <Card className="p-3.5 flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim mb-1">Total Gasto</p>
                    <p className="text-sm font-bold text-amber-400">R$ {totalSpent.toFixed(0)}</p>
                </Card>
            </div>

            {/* Maintenance Alerts */}
            <div>
                <div className="flex justify-between items-end mb-3 px-1">
                    <h3 className="text-base font-bold theme-text flex items-center gap-2">
                        <Wrench size={18} className="text-orange-500" /> Atenção na Oficina
                    </h3>
                    <button onClick={() => setActiveTab('maintenance')} className="text-xs font-medium text-orange-400 flex items-center">
                        Ver todas <ChevronRight size={14} />
                    </button>
                </div>
                <div className="space-y-3 stagger-children">
                    {upcomingMaintenance.length === 0 ? (
                        <Card className="text-center py-8">
                            <CheckCircle2 size={36} className="mx-auto mb-3 text-emerald-500/40" />
                            <p className="text-sm theme-text-muted font-medium">Tudo em dia com a motoca!</p>
                        </Card>
                    ) : (
                        upcomingMaintenance.map(maint => {
                            const isPast = maint.kmRemaining <= 0;
                            const isUrgent = maint.kmRemaining <= 300;
                            return (
                                <div key={`alert-${maint.id}`} className={`p-4 rounded-2xl border transition-all ${isPast ? 'bg-red-500/10 border-red-500/30 animate-pulse-glow' : isUrgent ? 'bg-red-500/10 border-red-500/30' : 'theme-bg-card theme-border'} flex items-center justify-between`}>
                                    <div>
                                        <h4 className={`font-semibold text-sm ${isUrgent || isPast ? 'text-red-400' : 'theme-text'}`}>{maint.type}</h4>
                                        <p className="text-xs theme-text-dim mt-0.5">Agendado: {maint.nextOdometer.toLocaleString('pt-BR')} km</p>
                                    </div>
                                    <div className={`text-right text-sm ${isUrgent || isPast ? 'text-red-400' : 'text-orange-400'} font-bold flex flex-col items-end`}>
                                        {(isUrgent || isPast) && <AlertTriangle size={14} className="mb-0.5" />}
                                        {isPast ? 'Passou do prazo!' : `Faltam ${maint.kmRemaining.toLocaleString('pt-BR')} km`}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
