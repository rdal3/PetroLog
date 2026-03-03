import { useState } from 'react';
import { Plus, Fuel, Calendar, Check, Trash2 } from 'lucide-react';
import { SwipeableCard } from '../components/ui/SwipeableCard.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Toggle } from '../components/ui/Toggle.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { useApp } from '../context/AppContext.jsx';

export function RefuelView() {
    const { consumptionStats, currentOdometer, addRefuel, deleteRefuel } = useApp();
    const [showForm, setShowForm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        odometer: '', liters: '', cost: '', fullTank: true, station: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addRefuel({
            date: formData.date,
            odometer: Number(formData.odometer),
            liters: Number(formData.liters),
            cost: Number(formData.cost),
            fullTank: formData.fullTank,
            station: formData.station,
        });
        setShowForm(false);
        setFormData({ date: new Date().toISOString().split('T')[0], odometer: '', liters: '', cost: '', fullTank: true, station: '' });
    };

    const handleDelete = () => { if (deleteTarget) { deleteRefuel(deleteTarget); setDeleteTarget(null); } };

    return (
        <div className="space-y-6 pb-safe animate-fade-in">
            <div className="flex justify-between items-center px-1">
                <h2 className="text-2xl font-bold theme-text">Abastecimentos</h2>
                <button onClick={() => setShowForm(!showForm)} className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                    <Plus size={22} />
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="theme-bg-card backdrop-blur-xl p-5 rounded-3xl border theme-border animate-slide-down shadow-2xl">
                    <h3 className="text-lg font-bold theme-text mb-5">Novo Registro</h3>
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Data" type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            <Input label="Odômetro (km)" type="number" required value={formData.odometer} onChange={e => setFormData({ ...formData, odometer: e.target.value })} placeholder={currentOdometer.toString()} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Litros (L)" type="number" step="0.01" required value={formData.liters} onChange={e => setFormData({ ...formData, liters: e.target.value })} placeholder="0.0" />
                            <Input label="Total Pago (R$)" type="number" step="0.01" required value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} placeholder="0.00" />
                        </div>
                        <Input label="Posto (opcional)" type="text" value={formData.station} onChange={e => setFormData({ ...formData, station: e.target.value })} placeholder="Ex: Shell Centro" />
                        <Toggle checked={formData.fullTank} onChange={() => setFormData({ ...formData, fullTank: !formData.fullTank })} label="Encheu o tanque?" description="Necessário para calcular o consumo real (km/l)" />
                    </div>

                    {formData.liters && formData.cost && (
                        <div className="mb-5 p-3 theme-bg-input rounded-2xl border theme-border text-center">
                            <p className="text-[10px] uppercase tracking-wider font-bold theme-text-dim mb-0.5">Custo por litro</p>
                            <p className="text-lg font-bold text-amber-400">R$ {(Number(formData.cost) / Number(formData.liters)).toFixed(2)} <span className="text-xs theme-text-dim">/L</span></p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3.5 rounded-2xl border theme-border theme-text-secondary font-semibold text-sm hover:opacity-80 transition-colors">Cancelar</button>
                        <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95">Salvar</button>
                    </div>
                </form>
            )}

            {/* Summary strip */}
            {consumptionStats.refuelsList.length > 0 && (
                <div className="flex gap-3 px-1">
                    <div className="flex-1 theme-bg-card border theme-border rounded-2xl px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase theme-text-dim font-bold">Registros</p>
                        <p className="text-sm font-bold theme-text">{consumptionStats.refuelsList.length}</p>
                    </div>
                    <div className="flex-1 theme-bg-card border theme-border rounded-2xl px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase theme-text-dim font-bold">Tot. Litros</p>
                        <p className="text-sm font-bold theme-text">{consumptionStats.refuelsList.reduce((a, r) => a + r.liters, 0).toFixed(1)} L</p>
                    </div>
                    <div className="flex-1 theme-bg-card border theme-border rounded-2xl px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase theme-text-dim font-bold">Tot. Gasto</p>
                        <p className="text-sm font-bold text-emerald-400">R$ {consumptionStats.totalCostFuel.toFixed(0)}</p>
                    </div>
                </div>
            )}

            <div className="space-y-3 stagger-children">
                {consumptionStats.refuelsList.map(r => (
                    <SwipeableCard key={r.id} onDelete={() => setDeleteTarget(r.id)} className="p-4 flex flex-col gap-3 group">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl flex-shrink-0 border ${r.fullTank ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'theme-bg-input theme-text-dim theme-border'}`}>
                                <Fuel size={22} fill={r.fullTank ? 'currentColor' : 'none'} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold theme-text text-lg leading-none">
                                        {r.odometer.toLocaleString('pt-BR')} <span className="text-xs font-normal theme-text-dim">km</span>
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold theme-text-secondary">R$ {r.cost.toFixed(2)}</span>
                                        <button onClick={() => setDeleteTarget(r.id)} className="opacity-0 group-hover:opacity-100 theme-text-dim hover:text-red-400 transition-all p-1 -mr-1">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1.5 text-xs theme-text-muted font-medium flex-wrap">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(r.date + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                                    <span className="w-1 h-1 rounded-full theme-border-secondary" />
                                    <span>{r.liters} L</span>
                                    <span className="w-1 h-1 rounded-full theme-border-secondary" />
                                    <span className="text-amber-400">R$ {r.custoLitro}/L</span>
                                    {r.station && (<><span className="w-1 h-1 rounded-full theme-border-secondary" /><span className="text-blue-400">{r.station}</span></>)}
                                </div>
                            </div>
                        </div>

                        <div className="pt-3 border-t theme-border flex justify-between items-center text-xs">
                            {r.consumoCalculado ? (
                                <>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/10 text-emerald-400 font-semibold">
                                        <Check size={12} strokeWidth={3} /> {r.consumoCalculado} km/l
                                    </div>
                                    <span className="theme-text-dim font-medium">Rodou {r.distanciaCalculada} km</span>
                                </>
                            ) : (
                                <div className="theme-text-dim italic w-full text-center py-1">
                                    {r.fullTank ? 'Ponto de partida (Aguardando próxima média)' : 'Tanque parcial (Aguardando tanque cheio)'}
                                </div>
                            )}
                        </div>
                    </SwipeableCard>
                ))}
            </div>

            <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Excluir Registro" message="Tem certeza que deseja excluir este abastecimento? Esta ação não pode ser desfeita." />
        </div>
    );
}
