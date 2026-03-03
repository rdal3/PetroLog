import { Droplet, MapPin, DollarSign, BarChart3, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
import { useApp } from '../context/AppContext.jsx';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine, Legend,
} from 'recharts';

const tooltipStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '16px',
    color: 'var(--text-primary)',
    padding: '12px',
};

export function StatsView() {
    const { consumptionStats, activeBike, monthlyData } = useApp();
    const goalKmL = activeBike.goalKmL || 0;

    // Cost per liter chart
    const costData = [...(activeBike.refuels || [])]
        .sort((a, b) => a.odometer - b.odometer)
        .map(r => ({
            data: new Date(r.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
            custoLitro: parseFloat((r.cost / r.liters).toFixed(2)),
            ...(r.station ? { posto: r.station } : {}),
        }));

    return (
        <div className="space-y-6 pb-safe animate-fade-in">
            <h2 className="text-2xl font-bold theme-text px-1">Desempenho</h2>

            {consumptionStats.data.length > 0 ? (
                <>
                    {/* Summary cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <Card className="p-3.5 text-center">
                            <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim mb-1">Média Geral</p>
                            <p className="text-2xl font-bold text-emerald-400">{consumptionStats.avg} <span className="text-xs theme-text-dim">km/l</span></p>
                        </Card>
                        <Card className="p-3.5 text-center">
                            <p className="text-[9px] uppercase tracking-wider font-bold theme-text-dim mb-1">Melhor Marca</p>
                            <p className="text-2xl font-bold text-orange-400">
                                {Math.max(...consumptionStats.data.map(d => d.consumo)).toFixed(1)} <span className="text-xs theme-text-dim">km/l</span>
                            </p>
                        </Card>
                    </div>

                    {/* Consumption chart with goal reference line */}
                    <Card className="p-5 pb-6">
                        <h3 className="theme-text-secondary font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wide">
                            <Droplet size={16} className="text-emerald-500" /> Média de Consumo (km/l)
                        </h3>
                        <div className="h-60 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={consumptionStats.data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                                    <XAxis dataKey="data" stroke="var(--text-muted)" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={10} domain={['dataMin - 2', 'dataMax + 5']} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} itemStyle={{ fontWeight: 'bold' }} />
                                    {goalKmL > 0 && (
                                        <ReferenceLine y={goalKmL} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={2} label={{ value: `Meta: ${goalKmL}`, position: 'insideTopRight', fill: '#f59e0b', fontSize: 10, fontWeight: 'bold' }} />
                                    )}
                                    <Line type="monotone" dataKey="consumo" stroke="#34d399" strokeWidth={4} dot={{ r: 5, fill: 'var(--bg-secondary)', strokeWidth: 3, stroke: '#34d399' }} activeDot={{ r: 7 }} name="Consumo" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        {goalKmL > 0 && (
                            <div className="mt-3 flex items-center gap-2 text-xs theme-text-dim">
                                <div className="w-6 h-0.5 bg-amber-500 rounded" style={{ borderTop: '2px dashed #f59e0b' }} />
                                <span>Meta: {goalKmL} km/l (configure em Ajustes)</span>
                            </div>
                        )}
                    </Card>

                    {/* Autonomy bar chart */}
                    <Card className="p-5 pb-6">
                        <h3 className="theme-text-secondary font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wide">
                            <MapPin size={16} className="text-orange-500" /> Autonomia Fechada (km)
                        </h3>
                        <div className="h-60 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={consumptionStats.data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                                    <XAxis dataKey="data" stroke="var(--text-muted)" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--border-secondary)', opacity: 0.5 }} />
                                    <Bar dataKey="distancia" fill="#f97316" radius={[6, 6, 0, 0]} name="Distância" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Cost per liter area chart */}
                    {costData.length > 1 && (
                        <Card className="p-5 pb-6">
                            <h3 className="theme-text-secondary font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wide">
                                <DollarSign size={16} className="text-amber-500" /> Preço do Litro (R$/L)
                            </h3>
                            <div className="h-60 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={costData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                                        <XAxis dataKey="data" stroke="var(--text-muted)" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                                        <YAxis stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={tooltipStyle} itemStyle={{ fontWeight: 'bold' }} />
                                        <Area type="monotone" dataKey="custoLitro" stroke="#f59e0b" strokeWidth={3} fill="url(#costGrad)" dot={{ r: 4, fill: 'var(--bg-secondary)', strokeWidth: 2, stroke: '#f59e0b' }} name="R$/L" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    )}

                    {/* Monthly comparison stacked bar chart */}
                    {monthlyData.length > 0 && (
                        <Card className="p-5 pb-6">
                            <h3 className="theme-text-secondary font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wide">
                                <TrendingUp size={16} className="text-purple-500" /> Comparativo Mensal (R$)
                            </h3>
                            <div className="h-60 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                                        <XAxis dataKey="mes" stroke="var(--text-muted)" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                                        <YAxis stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={tooltipStyle} />
                                        <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                                        <Bar dataKey="combustivel" stackId="a" fill="#34d399" radius={[0, 0, 0, 0]} name="Combustível" />
                                        <Bar dataKey="manutencao" stackId="a" fill="#f97316" radius={[6, 6, 0, 0]} name="Manutenção" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    )}
                </>
            ) : (
                <EmptyState icon={BarChart3} title="Sem dados suficientes" message='Registre pelo menos dois "Tanques Cheios" para o app poder calcular sua média exata de consumo.' />
            )}
        </div>
    );
}
