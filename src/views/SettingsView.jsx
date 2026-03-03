import { useRef, useState } from 'react';
import { Download, Upload, RotateCcw, Plus, Trash2, Bell, BellOff, Target, Fuel as FuelIcon } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Toggle } from '../components/ui/Toggle.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { BikeGraphics } from '../components/bikes/BikeGraphics.jsx';
import { useApp } from '../context/AppContext.jsx';

const bikeTypes = [
    { id: 'scooter', name: 'Scooter' },
    { id: 'cub', name: 'Motoneta (Biz)' },
    { id: 'naked', name: 'Naked / Street' },
    { id: 'sport', name: 'Esportiva' },
    { id: 'chopper', name: 'Custom / Chopper' },
];

export function SettingsView() {
    const {
        activeBike, bikes, updateBikeSettings,
        addBike, deleteBike, switchBike,
        exportData, importData, resetData,
        notificationsEnabled, requestNotifications,
    } = useApp();

    const fileInputRef = useRef(null);
    const [showAddBike, setShowAddBike] = useState(false);
    const [newBikeName, setNewBikeName] = useState('');
    const [newBikeType, setNewBikeType] = useState('naked');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [showResetModal, setShowResetModal] = useState(false);

    const handleImport = (e) => { const file = e.target.files[0]; if (file) importData(file); e.target.value = ''; };

    const handleAddBike = () => {
        if (!newBikeName.trim()) return;
        addBike(newBikeName.trim(), newBikeType);
        setNewBikeName('');
        setShowAddBike(false);
    };

    const handleDeleteBike = () => {
        if (deleteTarget) { deleteBike(deleteTarget); setDeleteTarget(null); }
    };

    return (
        <div className="space-y-6 pb-safe animate-fade-in">
            <h2 className="text-2xl font-bold theme-text px-1">Configurações</h2>

            {/* Bike Settings */}
            <Card className="space-y-6">
                <Input label="Apelido da Moto" type="text" value={activeBike.name} onChange={e => updateBikeSettings({ name: e.target.value })} placeholder="Ex: Hornet, Fazer, Biz..." />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium theme-text-muted mb-1.5 ml-1">
                            <FuelIcon size={10} className="inline mr-1" /> Tanque (litros)
                        </label>
                        <input
                            type="number" step="0.5" value={activeBike.tankSize || ''}
                            onChange={e => updateBikeSettings({ tankSize: Number(e.target.value) })}
                            className="w-full theme-bg-input border theme-border rounded-2xl p-3.5 theme-text outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm"
                            placeholder="14"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium theme-text-muted mb-1.5 ml-1">
                            <Target size={10} className="inline mr-1" /> Meta (km/l)
                        </label>
                        <input
                            type="number" step="0.1" value={activeBike.goalKmL || ''}
                            onChange={e => updateBikeSettings({ goalKmL: Number(e.target.value) })}
                            className="w-full theme-bg-input border theme-border rounded-2xl p-3.5 theme-text outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm"
                            placeholder="30"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium theme-text-muted mb-3 ml-1">Estilo da Moto</label>
                    <div className="grid grid-cols-2 gap-3">
                        {bikeTypes.map(type => (
                            <button key={type.id} onClick={() => updateBikeSettings({ type: type.id })}
                                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 ${activeBike.type === type.id
                                    ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                                    : 'theme-bg-input theme-border theme-text-dim hover:opacity-80'
                                    }`}>
                                <div className="w-16 h-12 opacity-90 flex items-center justify-center">{BikeGraphics[type.id]}</div>
                                <span className="text-xs font-semibold">{type.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Garagem (Multi-bike) */}
            <div>
                <div className="flex justify-between items-center px-1 mb-3">
                    <h3 className="text-base font-bold theme-text">Garagem</h3>
                    <button onClick={() => setShowAddBike(!showAddBike)} className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                        <Plus size={18} />
                    </button>
                </div>

                {showAddBike && (
                    <Card className="mb-3 animate-slide-down">
                        <h4 className="text-sm font-bold theme-text mb-3">Nova Moto</h4>
                        <div className="space-y-3 mb-4">
                            <Input label="Nome" type="text" value={newBikeName} onChange={e => setNewBikeName(e.target.value)} placeholder="Ex: XRE 300" />
                            <div>
                                <label className="block text-xs font-medium theme-text-muted mb-2 ml-1">Estilo</label>
                                <div className="flex flex-wrap gap-2">
                                    {bikeTypes.map(t => (
                                        <button key={t.id} type="button" onClick={() => setNewBikeType(t.id)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${newBikeType === t.id ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' : 'theme-bg-input theme-border theme-text-muted'}`}>
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowAddBike(false)} className="flex-1 py-2.5 rounded-2xl border theme-border theme-text-secondary font-semibold text-sm">Cancelar</button>
                            <button onClick={handleAddBike} className="flex-1 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm active:scale-95">Adicionar</button>
                        </div>
                    </Card>
                )}

                <div className="space-y-2">
                    {bikes.map(b => (
                        <div key={b.id} onClick={() => switchBike(b.id)}
                            className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${b.id === activeBike.id ? 'bg-orange-500/10 border-orange-500/30' : 'theme-bg-card theme-border hover:opacity-80'
                                }`}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-8 flex items-center justify-center opacity-80">{BikeGraphics[b.type]}</div>
                                <div>
                                    <h4 className={`text-sm font-semibold ${b.id === activeBike.id ? 'text-orange-400' : 'theme-text'}`}>{b.name}</h4>
                                    <p className="text-[10px] theme-text-dim">{bikeTypes.find(t => t.id === b.type)?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {b.id === activeBike.id && <span className="text-[9px] font-bold text-orange-400 uppercase bg-orange-500/10 px-2 py-0.5 rounded-lg">Ativa</span>}
                                {bikes.length > 1 && (
                                    <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(b.id); }} className="theme-text-dim hover:text-red-400 transition-colors p-1">
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notifications */}
            <div>
                <h3 className="text-base font-bold theme-text px-1 mb-3">Notificações</h3>
                <button onClick={requestNotifications}
                    className={`w-full theme-bg-card border theme-border rounded-2xl p-4 flex items-center gap-4 hover:opacity-80 transition-colors group`}>
                    <div className={`${notificationsEnabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-zinc-500/10 border-zinc-500/20 theme-text-dim'} p-2.5 rounded-xl border transition-colors`}>
                        {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                    </div>
                    <div className="text-left">
                        <h4 className="text-sm font-semibold theme-text">{notificationsEnabled ? 'Notificações ativas' : 'Ativar lembretes'}</h4>
                        <p className="text-[11px] theme-text-dim">Receba alertas quando manutenções estiverem próximas</p>
                    </div>
                </button>
            </div>

            {/* Data Management */}
            <div>
                <h3 className="text-base font-bold theme-text px-1 mb-3">Dados</h3>
                <div className="space-y-3">
                    <button onClick={exportData} className="w-full theme-bg-card border theme-border rounded-2xl p-4 flex items-center gap-4 hover:opacity-80 transition-colors group">
                        <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-400 border border-emerald-500/20"><Download size={20} /></div>
                        <div className="text-left">
                            <h4 className="text-sm font-semibold theme-text">Exportar Backup</h4>
                            <p className="text-[11px] theme-text-dim">Baixar todos os dados como arquivo JSON</p>
                        </div>
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="w-full theme-bg-card border theme-border rounded-2xl p-4 flex items-center gap-4 hover:opacity-80 transition-colors group">
                        <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-400 border border-blue-500/20"><Upload size={20} /></div>
                        <div className="text-left">
                            <h4 className="text-sm font-semibold theme-text">Importar Backup</h4>
                            <p className="text-[11px] theme-text-dim">Restaurar dados de um arquivo JSON</p>
                        </div>
                    </button>
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                    <button onClick={() => setShowResetModal(true)} className="w-full theme-bg-card border border-red-500/20 rounded-2xl p-4 flex items-center gap-4 hover:opacity-80 transition-colors group">
                        <div className="bg-red-500/10 p-2.5 rounded-xl text-red-400 border border-red-500/20"><RotateCcw size={20} /></div>
                        <div className="text-left">
                            <h4 className="text-sm font-semibold text-red-400">Resetar Dados</h4>
                            <p className="text-[11px] theme-text-dim">Apagar todos os dados permanentemente</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="text-center py-4">
                <p className="text-[10px] theme-text-dim font-medium uppercase tracking-widest">PetroLog v2.0.0</p>
                <p className="text-[10px] opacity-40 mt-1">Feito com 🧡 para motociclistas</p>
            </div>

            <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteBike} title="Excluir Moto" message="Tem certeza que deseja remover esta moto da garagem? Todos os registros serão perdidos." />
            <Modal open={showResetModal} onClose={() => setShowResetModal(false)} onConfirm={() => { resetData(); setShowResetModal(false); }} title="Resetar Tudo" message="Todos os abastecimentos, manutenções e configurações serão apagados permanentemente. Deseja continuar?" />
        </div>
    );
}
