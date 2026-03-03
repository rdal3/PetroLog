import { useState } from 'react';
import { Plus, Wrench, MapPin, AlertTriangle, Trash2 } from 'lucide-react';
import { SwipeableCard } from '../components/ui/SwipeableCard.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { useApp } from '../context/AppContext.jsx';

const presets = [
    { label: 'Óleo e Filtro', icon: '🛢️' },
    { label: 'Pastilha de Freio', icon: '🔴' },
    { label: 'Relação (Kit)', icon: '⚙️' },
    { label: 'Pneu', icon: '🔘' },
    { label: 'Vela de Ignição', icon: '⚡' },
    { label: 'Correia/Corrente', icon: '🔗' },
];

export function MaintenanceView() {
    const { maintenances, currentOdometer, addMaintenance, deleteMaintenance, activeBike } = useApp();
    const [showForm, setShowForm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0], odometer: '', type: '', cost: '', nextOdometer: '', notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addMaintenance({
            date: formData.date, odometer: Number(formData.odometer), type: formData.type,
            cost: Number(formData.cost), nextOdometer: formData.nextOdometer ? Number(formData.nextOdometer) : null, notes: formData.notes,
        });
        setShowForm(false);
        setFormData({ date: new Date().toISOString().split('T')[0], odometer: '', type: '', cost: '', nextOdometer: '', notes: '' });
    };

    const handleDelete = () => { if (deleteTarget) { deleteMaintenance(deleteTarget); setDeleteTarget(null); } };
    const applyPreset = (label) => setFormData(prev => ({ ...prev, type: label }));
    const sorted = [...(activeBike.maintenances || [])].sort((a, b) => b.odometer - a.odometer);

    return (
        <div className="space-y-6 pb-safe animate-fade-in">
            <div className="flex justify-between items-center px-1">
                <h2 className="text-2xl font-bold theme-text">Manutenções</h2>
                <button onClick={() => setShowForm(!showForm)} className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                    <Plus size={22} />
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="theme-bg-card backdrop-blur-xl p-5 rounded-3xl border theme-border animate-slide-down shadow-2xl">
                    <h3 className="text-lg font-bold theme-text mb-5">Novo Serviço</h3>
                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Data" type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            <Input label="Km Atual" type="number" required value={formData.odometer} onChange={e => setFormData({ ...formData, odometer: e.target.value })} placeholder={currentOdometer.toString()} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium theme-text-muted mb-2 ml-1">Serviço Rápido</label>
                            <div className="flex flex-wrap gap-2">
                                {presets.map(p => (
                                    <button key={p.label} type="button" onClick={() => applyPreset(p.label)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${formData.type === p.label ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' : 'theme-bg-input theme-border theme-text-muted hover:opacity-80'}`}>
                                        {p.icon} {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Input label="Serviço/Peça (ou personalizado)" type="text" required value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} placeholder="Ex: Troca de óleo" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Custo (R$)" type="number" step="0.01" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} placeholder="0.00" />
                            <Input label="Próxima Troca (Km)" type="number" value={formData.nextOdometer} onChange={e => setFormData({ ...formData, nextOdometer: e.target.value })} placeholder="Ex: 18000" />
                        </div>
                        <Input label="Observações" type="text" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Marca, detalhes..." />
                    </div>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3.5 rounded-2xl border theme-border theme-text-secondary font-semibold text-sm hover:opacity-80 transition-colors">Cancelar</button>
                        <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95">Salvar</button>
                    </div>
                </form>
            )}

            {sorted.length > 0 && (
                <div className="flex gap-3 px-1">
                    <div className="flex-1 theme-bg-card border theme-border rounded-2xl px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase theme-text-dim font-bold">Registros</p>
                        <p className="text-sm font-bold theme-text">{sorted.length}</p>
                    </div>
                    <div className="flex-1 theme-bg-card border theme-border rounded-2xl px-3 py-2.5 text-center">
                        <p className="text-[9px] uppercase theme-text-dim font-bold">Total Investido</p>
                        <p className="text-sm font-bold text-orange-400">R$ {sorted.reduce((a, m) => a + m.cost, 0).toFixed(0)}</p>
                    </div>
                </div>
            )}

            <div className="space-y-3 stagger-children">
                {sorted.map(m => (
                    <SwipeableCard key={m.id} onDelete={() => setDeleteTarget(m.id)} className="p-4 flex flex-col gap-2 group">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-400 border border-orange-500/20"><Wrench size={22} /></div>
                                <div>
                                    <h4 className="font-bold theme-text">{m.type}</h4>
                                    <p className="text-xs font-medium theme-text-muted flex items-center gap-1.5 mt-0.5">
                                        <MapPin size={10} /> {m.odometer.toLocaleString('pt-BR')} km
                                        <span className="w-1 h-1 rounded-full theme-border-secondary mx-0.5" />
                                        {new Date(m.date).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold theme-text-secondary mt-1">R$ {m.cost.toFixed(2)}</span>
                                <button onClick={() => setDeleteTarget(m.id)} className="opacity-0 group-hover:opacity-100 theme-text-dim hover:text-red-400 transition-all p-1 -mr-1"><Trash2 size={14} /></button>
                            </div>
                        </div>
                        {(m.notes || m.nextOdometer) && (
                            <div className="mt-2 pt-3 border-t theme-border text-xs">
                                {m.notes && <p className="theme-text-muted mb-2 italic">"{m.notes}"</p>}
                                {m.nextOdometer && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/10 text-amber-500 font-semibold">
                                        <AlertTriangle size={12} /> Refazer em {m.nextOdometer.toLocaleString('pt-BR')} km
                                    </div>
                                )}
                            </div>
                        )}
                    </SwipeableCard>
                ))}
            </div>

            <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Excluir Manutenção" message="Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita." />
        </div>
    );
}
