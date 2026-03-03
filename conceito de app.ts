import React, { useState, useMemo } from 'react';
import {
    Home, Fuel, Wrench, BarChart3, Settings,
    Plus, AlertTriangle, CheckCircle2, Calendar,
    MapPin, Droplet, ChevronRight, Check, TrendingUp
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- SVGs Premium e Detalhados das Motos ---
const BikeGraphics = {
    scooter: (
        <svg viewBox= "0 0 120 80" className="w-full h-32 md:h-40 drop-shadow-2xl" >
        {/* Pneus */ }
        < circle cx="25" cy="55" r="12" fill="#27272a" stroke="#52525b" strokeWidth="3" />
        <circle cx="95" cy = "55" r="12" fill="#27272a" stroke="#52525b" strokeWidth="3" />
        {/* Rodas/Aros */ }
        < circle cx="25" cy="55" r="5" fill="#a1a1aa" />
        <circle cx="95" cy = "55" r="5" fill="#a1a1aa" />
        {/* Paralamas e Suspensão */ }
        < path d="M 15 50 Q 25 35 35 50" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <line x1="95" y1 = "55" x2="85" y2="30" stroke="#a1a1aa" strokeWidth="3" strokeLinecap="round" />
        {/* Corpo principal (Carenagem) */ }
        < path d="M 85 30 L 75 15 Q 70 10 65 15 L 55 45 L 40 45 Q 35 35 25 35 L 15 35 Q 10 40 10 45 Q 15 55 25 55 L 35 55 Q 40 55 45 45 Z" fill="#f97316" />
        {/* Assento */ }
        < path d="M 12 35 L 30 35 Q 35 30 35 25 L 15 25 Q 10 25 12 35 Z" fill="#18181b" />
        {/* Farol e Painel */ }
        < circle cx="78" cy="18" r="4" fill="#fef08a" />
        <path d="M 75 15 L 65 5 L 60 8" fill = "none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1 = "5" x2="60" y2="2" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
        {/* Assoalho (Detalhe) */ }
        < line x1="42" y1="45" x2="52" y2="45" stroke="#3f3f46" strokeWidth="3" />
        </svg>
  ),
cub: (
    <svg viewBox= "0 0 120 80" className = "w-full h-32 md:h-40 drop-shadow-2xl" >
        {/* Pneus (Maiores que scooter, finos) */ }
        < circle cx = "20" cy = "55" r = "15" fill = "#27272a" stroke = "#52525b" strokeWidth = "2" />
            <circle cx="100" cy = "55" r = "15" fill = "#27272a" stroke = "#52525b" strokeWidth = "2" />
                <circle cx="20" cy = "55" r = "7" fill = "none" stroke = "#a1a1aa" strokeWidth = "1" strokeDasharray = "2 2" />
                    <circle cx="100" cy = "55" r = "7" fill = "none" stroke = "#a1a1aa" strokeWidth = "1" strokeDasharray = "2 2" />
                        {/* Amortecedor traseiro */ }
                        < line x1 = "20" y1 = "55" x2 = "30" y2 = "30" stroke = "#facc15" strokeWidth = "2" strokeLinecap = "round" />
                            {/* Motor horizontal (Característico Biz) */ }
                            < rect x = "45" y = "45" width = "20" height = "10" rx = "3" fill = "#52525b" />
                                <circle cx="50" cy = "50" r = "3" fill = "#71717a" />
                                    {/* Carenagem Principal e Escudo */ }
                                    < path d = "M 90 25 L 80 45 L 65 50 L 55 45 L 45 25 Q 60 35 75 30 Z" fill = "#f97316" />
                                        <path d="M 45 25 L 30 25 Q 20 25 15 35 L 35 35 Z" fill = "#f97316" />
                                            {/* Assento */ }
                                            < path d = "M 12 30 L 48 30 Q 50 25 45 20 L 15 20 Q 10 20 12 30 Z" fill = "#18181b" />
                                                {/* Garfo dianteiro e guidão */ }
                                                < line x1 = "100" y1 = "55" x2 = "85" y2 = "20" stroke = "#a1a1aa" strokeWidth = "3" strokeLinecap = "round" />
                                                    <path d="M 85 20 L 75 10 L 70 12" fill = "none" stroke = "#f97316" strokeWidth = "5" strokeLinecap = "round" />
                                                        <circle cx="82" cy = "15" r = "3" fill = "#fef08a" />
                                                            {/* Cobre corrente */ }
                                                            < line x1 = "20" y1 = "55" x2 = "45" y2 = "50" stroke = "#3f3f46" strokeWidth = "4" strokeLinecap = "round" />
                                                                </svg>
  ),
sport: (
    <svg viewBox= "0 0 120 80" className = "w-full h-32 md:h-40 drop-shadow-2xl" >
        {/* Pneus (Gordos) */ }
        < circle cx = "22" cy = "55" r = "14" fill = "#18181b" stroke = "#3f3f46" strokeWidth = "4" />
            <circle cx="98" cy = "55" r = "14" fill = "#18181b" stroke = "#3f3f46" strokeWidth = "4" />
                {/* Disco de Freio Frontal */ }
                < circle cx = "98" cy = "55" r = "8" fill = "none" stroke = "#d4d4d8" strokeWidth = "1.5" />
                    {/* Balança e Escapamento */ }
                    < line x1 = "22" y1 = "55" x2 = "45" y2 = "50" stroke = "#71717a" strokeWidth = "4" strokeLinecap = "round" />
                        <path d="M 45 55 L 65 50 L 75 45" fill = "none" stroke = "#3f3f46" strokeWidth = "5" strokeLinecap = "round" />
                            {/* Carenagem Completa */ }
                            < path d = "M 98 45 L 90 25 L 75 15 L 55 25 L 45 45 L 65 55 L 85 55 Z" fill = "#f97316" />
                                {/* Rabeta Alta */ }
                                < path d = "M 55 25 L 35 25 L 15 15 L 25 35 L 45 35 Z" fill = "#f97316" />
                                    {/* Bolha (Para-brisa) */ }
                                    < path d = "M 75 15 L 85 10 L 92 20 Z" fill = "#71717a" fillOpacity = "0.4" />
                                        {/* Assento */ }
                                        < path d = "M 35 25 L 50 25 L 45 20 L 30 20 Z" fill = "#18181b" />
                                            {/* Roda/Garfo Frontal (Invertido) */ }
                                            < line x1 = "98" y1 = "55" x2 = "82" y2 = "20" stroke = "#eab308" strokeWidth = "3" strokeLinecap = "round" />
                                                {/* Farol Agressivo */ }
                                                < polygon points = "90,25 95,28 92,32" fill = "#fef08a" />
                                                    </svg>
  ),
naked: (
    <svg viewBox= "0 0 120 80" className = "w-full h-32 md:h-40 drop-shadow-2xl" >
        {/* Pneus */ }
        < circle cx = "20" cy = "55" r = "14" fill = "#18181b" stroke = "#3f3f46" strokeWidth = "3" />
            <circle cx="95" cy = "55" r = "14" fill = "#18181b" stroke = "#3f3f46" strokeWidth = "3" />
                {/* Disco Freio */ }
                < circle cx = "95" cy = "55" r = "7" fill = "none" stroke = "#d4d4d8" strokeWidth = "1.5" />
                    {/* Motor Exposto */ }
                    < rect x = "45" y = "35" width = "20" height = "20" rx = "2" fill = "#52525b" />
                        <line x1="45" y1 = "40" x2 = "65" y2 = "40" stroke = "#3f3f46" strokeWidth = "2" />
                            <line x1="45" y1 = "45" x2 = "65" y2 = "45" stroke = "#3f3f46" strokeWidth = "2" />
                                <line x1="45" y1 = "50" x2 = "65" y2 = "50" stroke = "#3f3f46" strokeWidth = "2" />
                                    {/* Escapamento */ }
                                    < path d = "M 55 55 Q 60 65 80 50" fill = "none" stroke = "#a1a1aa" strokeWidth = "4" strokeLinecap = "round" />
                                        {/* Chassi Treliça */ }
                                        < path d = "M 40 25 L 50 40 L 65 30 Z" fill = "none" stroke = "#f97316" strokeWidth = "3" strokeLinejoin = "round" />
                                            <line x1="40" y1 = "25" x2 = "65" y2 = "30" stroke = "#f97316" strokeWidth = "3" />
                                                {/* Tanque Musculoso */ }
                                                < path d = "M 75 25 Q 65 15 50 20 L 40 25 Q 50 35 65 30 Z" fill = "#f97316" />
                                                    {/* Rabeta Curta */ }
                                                    < path d = "M 40 25 L 20 15 L 25 30 L 35 35 Z" fill = "#f97316" />
                                                        {/* Assento */ }
                                                        < path d = "M 45 22 L 25 18 L 22 23 L 40 26 Z" fill = "#18181b" />
                                                            {/* Garfo e Farol Redondo */ }
                                                            < line x1 = "95" y1 = "55" x2 = "80" y2 = "20" stroke = "#71717a" strokeWidth = "3" strokeLinecap = "round" />
                                                                <circle cx="82" cy = "20" r = "5" fill = "#fef08a" stroke = "#18181b" strokeWidth = "2" />
                                                                    <line x1="80" y1 = "20" x2 = "70" y2 = "15" stroke = "#a1a1aa" strokeWidth = "2" strokeLinecap = "round" />
                                                                        </svg>
  ),
chopper: (
    <svg viewBox= "0 0 120 80" className = "w-full h-32 md:h-40 drop-shadow-2xl" >
        {/* Pneu Traseiro (Gordo) */ }
        < circle cx = "20" cy = "55" r = "16" fill = "#18181b" stroke = "#3f3f46" strokeWidth = "5" />
            {/* Pneu Dianteiro (Fino) */ }
            < circle cx = "105" cy = "55" r = "14" fill = "#18181b" stroke = "#52525b" strokeWidth = "2" />
                <line x1="105" y1 = "41" x2 = "105" y2 = "69" stroke = "#a1a1aa" strokeWidth = "1" />
                    <line x1="91" y1 = "55" x2 = "119" y2 = "55" stroke = "#a1a1aa" strokeWidth = "1" />
                        {/* Motor V-Twin */ }
                        < path d = "M 50 50 L 45 35 L 55 35 Z" fill = "#71717a" />
                            <path d="M 55 50 L 60 35 L 70 35 Z" fill = "#71717a" />
                                <circle cx="52" cy = "52" r = "6" fill = "#52525b" />
                                    {/* Escapamento Duplo Longo */ }
                                    < path d = "M 50 52 Q 30 55 5 50" fill = "none" stroke = "#d4d4d8" strokeWidth = "3" strokeLinecap = "round" />
                                        <path d="M 55 55 Q 35 60 5 55" fill = "none" stroke = "#d4d4d8" strokeWidth = "3" strokeLinecap = "round" />
                                            {/* Garfo Longo (Rake) */ }
                                            < line x1 = "105" y1 = "55" x2 = "75" y2 = "15" stroke = "#a1a1aa" strokeWidth = "3" strokeLinecap = "round" />
                                                {/* Guidão Seca-Suvaco (Ape Hangers) */ }
                                                < path d = "M 75 15 L 70 5 L 60 10" fill = "none" stroke = "#d4d4d8" strokeWidth = "2" strokeLinecap = "round" />
                                                    {/* Tanque Gota */ }
                                                    < path d = "M 75 25 Q 60 15 45 30 L 70 30 Z" fill = "#f97316" />
                                                        {/* Chassi e Rabeta Baixa */ }
                                                        < path d = "M 45 30 L 30 40 L 15 40 Q 10 40 5 45" fill = "none" stroke = "#f97316" strokeWidth = "4" strokeLinecap = "round" />
                                                            {/* Assento Baixo */ }
                                                            < path d = "M 45 28 L 30 38 L 25 38 Q 30 30 40 28 Z" fill = "#18181b" />
                                                                {/* Sissy bar (Encosto) */ }
                                                                < line x1 = "15" y1 = "40" x2 = "10" y2 = "25" stroke = "#d4d4d8" strokeWidth = "2" strokeLinecap = "round" />
                                                                    {/* Farol Pequeno */ }
                                                                    < circle cx = "82" cy = "22" r = "3" fill = "#fef08a" />
                                                                        </svg>
  )
};

// --- Dados Mockados Iniciais (Com lógica de Tanque Cheio) ---
const initialRefuels = [
    // Primeiro abastecimento sempre base
    { id: 1, date: '2026-01-10', odometer: 15000, liters: 12, cost: 66, fullTank: true },
    // Abastecimento parcial (só botou 20ão)
    { id: 2, date: '2026-01-25', odometer: 15150, liters: 3.5, cost: 20, fullTank: false },
    // Abastecimento cheio (aqui ele calcula a média de 15000 até 15320 usando 3.5L + 10L)
    { id: 3, date: '2026-02-05', odometer: 15320, liters: 10, cost: 55, fullTank: true },
    { id: 4, date: '2026-02-20', odometer: 15650, liters: 10.8, cost: 59.40, fullTank: true },
    // Último foi parcial, então no app vai aparecer "Aguardando..."
    { id: 5, date: '2026-03-01', odometer: 15800, liters: 5, cost: 28, fullTank: false },
];

const initialMaintenances = [
    { id: 1, date: '2025-11-15', odometer: 12000, type: 'Óleo e Filtro', cost: 80, nextOdometer: 15000, notes: 'Motul 10w40' },
    { id: 2, date: '2026-02-05', odometer: 15100, type: 'Pastilha de Freio', cost: 120, nextOdometer: 25000, notes: 'Dianteira e Traseira' },
];

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [bikeType, setBikeType] = useState('naked');
    const [bikeName, setBikeName] = useState('Minha Moto');

    const [refuels, setRefuels] = useState(initialRefuels);
    const [maintenances, setMaintenances] = useState(initialMaintenances);

    // --- Lógica Otimizada de Estatísticas ---
    const currentOdometer = useMemo(() => {
        const maxRefuel = Math.max(...refuels.map(r => r.odometer), 0);
        const maxMaint = Math.max(...maintenances.map(m => m.odometer), 0);
        return Math.max(maxRefuel, maxMaint);
    }, [refuels, maintenances]);

    const consumptionStats = useMemo(() => {
        const sorted = [...refuels].sort((a, b) => a.odometer - b.odometer);
        const data = [];

        let lastFullRefuel = null;
        let accumulatedLiters = 0;
        let totalDistOverall = 0;
        let totalLitersOverall = 0;

        for (const r of sorted) {
            // Se não temos um ponto de partida ainda, procuramos o primeiro tanque cheio
            if (!lastFullRefuel) {
                if (r.fullTank) lastFullRefuel = r;
                continue;
            }

            accumulatedLiters += r.liters;

            // Se esse abastecimento também for tanque cheio, fechamos o ciclo e calculamos a média
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
                    litersUsed: accumulatedLiters
                });

                // Reseta as variáveis para o próximo ciclo, começando a partir deste tanque cheio
                lastFullRefuel = r;
                accumulatedLiters = 0;
            }
        }

        // Calcula as médias dos abastecimentos que constam em "data" (têm consumo calculado)
        // Para abastecimentos isolados (que não fecharam ciclo), adicionamos um consumo null ou aviso
        const refuelsWithStats = sorted.map(r => {
            const stat = data.find(d => d.id === r.id);
            return {
                ...r,
                consumoCalculado: stat ? stat.consumo : null,
                distanciaCalculada: stat ? stat.distancia : null
            }
        }).reverse(); // Mais recente primeiro

        return {
            avg: totalLitersOverall > 0 ? (totalDistOverall / totalLitersOverall).toFixed(1) : 0,
            data,
            totalDistOverall,
            refuelsList: refuelsWithStats
        };
    }, [refuels]);

    const upcomingMaintenance = useMemo(() => {
        return maintenances
            .filter(m => m.nextOdometer)
            .map(m => ({
                ...m,
                kmRemaining: m.nextOdometer - currentOdometer
            }))
            .sort((a, b) => a.kmRemaining - b.kmRemaining)
            .slice(0, 3);
    }, [maintenances, currentOdometer]);

    // --- Componentes Compartilhados ---
    const Card = ({ children, className = '' }) => (
        <div className= {`bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 border border-zinc-800/80 shadow-lg ${className}`
}>
    { children }
    </div>
  );

const Input = ({ label, ...props }) => (
    <div>
    <label className= "block text-xs font-medium text-zinc-400 mb-1.5 ml-1" > { label } </label>
    < input
className = "w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3.5 text-zinc-100 outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-zinc-600"
{...props } 
      />
    </div>
  );

// --- Telas (Views) ---

const HomeView = () => (
    <div className= "space-y-6 pb-28 animate-in fade-in duration-300" >

    {/* Garagem / Header da Moto */ }
    < Card className = "relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800" >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none" >
            <TrendingUp size={ 120 } />
                </div>

                < div className = "flex justify-between items-start mb-2 relative z-10" >
                    <div>
                    <h2 className="text-2xl font-bold text-zinc-100 tracking-tight" > { bikeName } </h2>
                        < div className = "inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50" >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-medium text-zinc-300" > { currentOdometer.toLocaleString('pt-BR') } km </span>
                                    </div>
                                    </div>
                                    </div>

                                    < div className = "flex justify-center items-center py-6 relative z-10" >
                                        <div className="w-64 text-zinc-200 transition-all duration-500 hover:scale-105" >
                                            { BikeGraphics[bikeType]}
                                            </div>
                                            </div>

                                            < div className = "grid grid-cols-2 gap-3 mt-2 relative z-10" >
                                                <div className="bg-zinc-950/50 rounded-2xl p-3.5 border border-zinc-800/80 flex flex-col justify-center" >
                                                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-0.5" > Consumo Médio </p>
                                                        < p className = "text-xl font-bold text-emerald-400" >
                                                            { consumptionStats.avg > 0 ? consumptionStats.avg : '--' } < span className = "text-xs font-medium text-zinc-500" > km / l </span>
                                                                </p>
                                                                </div>
                                                                < div className = "bg-zinc-950/50 rounded-2xl p-3.5 border border-zinc-800/80 flex flex-col justify-center" >
                                                                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-0.5" > Distância Registrada </p>
                                                                        < p className = "text-xl font-bold text-orange-400" >
                                                                            { consumptionStats.totalDistOverall } < span className = "text-xs font-medium text-zinc-500" > km </span>
                                                                                </p>
                                                                                </div>
                                                                                </div>
                                                                                </Card>

{/* Alertas de Manutenção */ }
<div>
    <div className="flex justify-between items-end mb-3 px-1" >
        <h3 className="text-base font-bold text-zinc-200 flex items-center gap-2" >
            <Wrench size={ 18 } className = "text-orange-500" />
                Atenção na Oficina
                    </h3>
                    < button onClick = {() => setActiveTab('maintenance')} className = "text-xs font-medium text-orange-400 flex items-center" >
                        Ver todas < ChevronRight size = { 14} />
                            </button>
                            </div>

                            < div className = "space-y-3" >
                            {
                                upcomingMaintenance.length === 0 ? (
                                    <Card className= "text-center py-8" >
                                    <CheckCircle2 size={ 36 } className = "mx-auto mb-3 text-emerald-500/40" />
                                        <p className="text-sm text-zinc-400 font-medium" > Tudo em dia com a motoca! </p>
                                            </Card>
          ) : (
    upcomingMaintenance.map(maint => {
        const isUrgent = maint.kmRemaining <= 300;
        return (
            <div key= {`alert-${maint.id}`
    } className = {`p-4 rounded-2xl border transition-all ${isUrgent ? 'bg-red-500/10 border-red-500/30' : 'bg-zinc-900/60 border-zinc-800/80'} flex items-center justify-between`}>
    <div>
    <h4 className={`font-semibold text-sm ${isUrgent ? 'text-red-400' : 'text-zinc-200'}`}> { maint.type } </h4>
    < p className = "text-xs text-zinc-500 mt-0.5" > Agendado: { maint.nextOdometer.toLocaleString('pt-BR') } km </p>
    </div>
    < div className = {`text-right text-sm ${isUrgent ? 'text-red-400' : 'text-orange-400'} font-bold flex flex-col items-end`}>
    { isUrgent && <AlertTriangle size={ 14} className = "mb-0.5" />}
        { maint.kmRemaining > 0 ? `Faltam ${maint.kmRemaining} km` : 'Passou do prazo!' }
        </div>
        </div>
    )
            })
          )}
</div>
    </div>
    </div>
  );

const RefuelView = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        odometer: '',
        liters: '',
        cost: '',
        fullTank: true // Padrão recomendado
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRefuel = {
            id: Date.now(),
            date: formData.date,
            odometer: Number(formData.odometer),
            liters: Number(formData.liters),
            cost: Number(formData.cost),
            fullTank: formData.fullTank
        };
        setRefuels([...refuels, newRefuel]);
        setShowForm(false);
        setFormData({ date: new Date().toISOString().split('T')[0], odometer: '', liters: '', cost: '', fullTank: true });
    };

    return (
        <div className= "space-y-6 pb-28 animate-in fade-in duration-300" >
        <div className="flex justify-between items-center px-1" >
            <h2 className="text-2xl font-bold text-zinc-100" > Abastecimentos </h2>
                < button
    onClick = {() => setShowForm(!showForm)}
className = "bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
    >
    <Plus size={ 22 } />
        </button>
        </div>

{
    showForm && (
        <form onSubmit={ handleSubmit } className = "bg-zinc-900/90 backdrop-blur-xl p-5 rounded-3xl border border-zinc-800 animate-in slide-in-from-top-4 shadow-2xl" >
            <h3 className="text-lg font-bold text-zinc-100 mb-5" > Novo Registro </h3>

                < div className = "space-y-4 mb-6" >
                    <div className="grid grid-cols-2 gap-4" >
                        <Input label="Data" type = "date" required value = { formData.date } onChange = { e => setFormData({ ...formData, date: e.target.value })
} />
    < Input label = "Odômetro (km)" type = "number" required value = { formData.odometer } onChange = { e => setFormData({ ...formData, odometer: e.target.value })} placeholder = { currentOdometer.toString() } />
        </div>
        < div className = "grid grid-cols-2 gap-4" >
            <Input label="Litros (L)" type = "number" step = "0.01" required value = { formData.liters } onChange = { e => setFormData({ ...formData, liters: e.target.value })} placeholder = "0.0" />
                <Input label="Total Pago (R$)" type = "number" step = "0.01" required value = { formData.cost } onChange = { e => setFormData({ ...formData, cost: e.target.value })} placeholder = "0.00" />
                    </div>

{/* Toggle Tanque Cheio */ }
<div 
                className="flex items-center justify-between p-4 rounded-2xl border border-zinc-800 bg-zinc-950/50 cursor-pointer transition-colors hover:border-zinc-700"
onClick = {() => setFormData({ ...formData, fullTank: !formData.fullTank })}
              >
    <div>
    <h4 className="text-sm font-semibold text-zinc-200" > Encheu o tanque ? </h4>
        < p className = "text-[10px] text-zinc-500 mt-0.5 leading-tight" > Necessário para calcular o consumo real(km / l) </p>
            </div>
            < div className = {`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center ${formData.fullTank ? 'bg-orange-500' : 'bg-zinc-700'}`}>
                <div className={ `w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-in-out ${formData.fullTank ? 'translate-x-6' : 'translate-x-0'}` } />
                    </div>
                    </div>
                    </div>

                    < div className = "flex gap-3" >
                        <button type="button" onClick = {() => setShowForm(false)} className = "flex-1 py-3.5 rounded-2xl border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 transition-colors" > Cancelar </button>
                            < button type = "submit" className = "flex-1 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all" > Salvar </button>
                                </div>
                                </form>
        )}

<div className="space-y-3" >
    {
        consumptionStats.refuelsList.map((r, i) => {
            // Lógica visual: Se não for tanque cheio, mostrar ícone vazado. 
            // Se não calculou consumo (porque foi o primeiro ou é parcial sem próximo cheio), avisar.
            return (
                <Card key= { r.id } className = "p-4 flex flex-col gap-3" >
                    <div className="flex items-start gap-4" >
                        <div className={ `p-3 rounded-2xl flex-shrink-0 border ${r.fullTank ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}` }>
                            <Fuel size={ 22 } fill = { r.fullTank ? "currentColor" : "none" } />
                                </div>
                                < div className = "flex-1" >
                                    <div className="flex justify-between items-start" >
                                        <h4 className="font-bold text-zinc-200 text-lg leading-none" > { r.odometer.toLocaleString('pt-BR') } < span className = "text-xs font-normal text-zinc-500" > km < /span></h4 >
                                            <span className="text-sm font-bold text-zinc-300" > R$ { r.cost.toFixed(2) } </span>
                                                </div>
                                                < div className = "flex items-center gap-3 mt-1.5 text-xs text-zinc-400 font-medium" >
                                                    <span className="flex items-center gap-1" > <Calendar size={ 12 } /> {new Date(r.date).toLocaleDateString('pt-BR')}</span >
                                                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                                            <span>{ r.liters } L </span>
                                                                </div>
                                                                </div>
                                                                </div>

                                                                < div className = "pt-3 border-t border-zinc-800/80 flex justify-between items-center text-xs" >
                                                                {
                                                                    r.consumoCalculado ? (
                                                                        <>
                                                                        <div className= "flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/10 text-emerald-400 font-semibold" >
                                                                        <Check size={ 12 } strokeWidth = { 3} /> { r.consumoCalculado } km / l
                                                                            </div>
                                                                            < span className = "text-zinc-500 font-medium" > Rodou { r.distanciaCalculada } km </span>
                                                                                </>
                  ) : (
                                                                                    <div className="text-zinc-500 italic w-full text-center py-1" >
                                                                                    {
                                                                                        r.fullTank
                                                                                            ? "Ponto de partida (Aguardando próxima média)"
                                                                                            : "Tanque parcial (Aguardando tanque cheio)"
                                                                                    }
                                                                                </div>
                                                                                )}
</div>
    </Card>
            )
          })}
</div>
    </div>
    );
  };

const MaintenanceView = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ date: new Date().toISOString().split('T')[0], odometer: '', type: '', cost: '', nextOdometer: '', notes: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMaint = {
            id: Date.now(),
            date: formData.date,
            odometer: Number(formData.odometer),
            type: formData.type,
            cost: Number(formData.cost),
            nextOdometer: formData.nextOdometer ? Number(formData.nextOdometer) : null,
            notes: formData.notes
        };
        setMaintenances([...maintenances, newMaint]);
        setShowForm(false);
        setFormData({ date: new Date().toISOString().split('T')[0], odometer: '', type: '', cost: '', nextOdometer: '', notes: '' });
    };

    return (
        <div className= "space-y-6 pb-28 animate-in fade-in duration-300" >
        <div className="flex justify-between items-center px-1" >
            <h2 className="text-2xl font-bold text-zinc-100" > Manutenções </h2>
                < button onClick = {() => setShowForm(!showForm)} className = "bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all" >
                    <Plus size={ 22 } />
                        </button>
                        </div>

{
    showForm && (
        <form onSubmit={ handleSubmit } className = "bg-zinc-900/90 backdrop-blur-xl p-5 rounded-3xl border border-zinc-800 animate-in slide-in-from-top-4 shadow-2xl" >
            <h3 className="text-lg font-bold text-zinc-100 mb-5" > Novo Serviço </h3>
                < div className = "space-y-4 mb-6" >
                    <div className="grid grid-cols-2 gap-4" >
                        <Input label="Data" type = "date" required value = { formData.date } onChange = { e => setFormData({ ...formData, date: e.target.value })
} />
    < Input label = "Km Atual" type = "number" required value = { formData.odometer } onChange = { e => setFormData({ ...formData, odometer: e.target.value })} placeholder = { currentOdometer.toString() } />
        </div>
        < Input label = "Serviço/Peça (ex: Óleo, Relação)" type = "text" required value = { formData.type } onChange = { e => setFormData({ ...formData, type: e.target.value })} placeholder = "Troca de óleo" />
            <div className="grid grid-cols-2 gap-4" >
                <Input label="Custo (R$)" type = "number" step = "0.01" value = { formData.cost } onChange = { e => setFormData({ ...formData, cost: e.target.value })} placeholder = "0.00" />
                    <Input label="Próxima Troca (Km) - Opcional" type = "number" value = { formData.nextOdometer } onChange = { e => setFormData({ ...formData, nextOdometer: e.target.value })} placeholder = "Ex: 18000" />
                        </div>
                        < Input label = "Observações" type = "text" value = { formData.notes } onChange = { e => setFormData({ ...formData, notes: e.target.value })} placeholder = "Marca do óleo, detalhes..." />
                            </div>
                            < div className = "flex gap-3" >
                                <button type="button" onClick = {() => setShowForm(false)} className = "flex-1 py-3.5 rounded-2xl border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 transition-colors" > Cancelar </button>
                                    < button type = "submit" className = "flex-1 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all" > Salvar </button>
                                        </div>
                                        </form>
        )}

<div className="space-y-3" >
{
    [...maintenances].sort((a, b) => b.odometer - a.odometer).map(m => (
        <Card key= { m.id } className = "p-4 flex flex-col gap-2" >
        <div className="flex justify-between items-start" >
    <div className="flex items-center gap-3" >
    <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-400 border border-orange-500/20" >
    <Wrench size={ 22} />
    </div>
    < div >
    <h4 className="font-bold text-zinc-200" > { m.type } </h4>
    < p className = "text-xs font-medium text-zinc-400 flex items-center gap-1.5 mt-0.5" >
    <MapPin size={ 10} /> { m.odometer.toLocaleString('pt-BR') } km
    < span className = "w-1 h-1 rounded-full bg-zinc-700 mx-0.5" />
    { new Date(m.date).toLocaleDateString('pt-BR') }
    </p>
    </div>
    </div>
    < span className = "text-sm font-bold text-zinc-300 mt-1" > R$ { m.cost.toFixed(2) } </span>
    </div>
              
              {(m.notes || m.nextOdometer) && (
            <div className="mt-2 pt-3 border-t border-zinc-800/80 text-xs" >
    { m.notes && <p className="text-zinc-500 mb-2 italic"> "{m.notes}" </p> }
                  {
            m.nextOdometer && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/10 text-amber-500 font-semibold">
                    <AlertTriangle size={ 12} /> Refazer em { m.nextOdometer.toLocaleString('pt-BR') } km
    </div>
    )
}
    </div>
              )}
</Card>
          ))}
</div>
    </div>
    );
  };

const StatsView = () => {
    return (
        <div className= "space-y-6 pb-28 animate-in fade-in duration-300" >
        <h2 className="text-2xl font-bold text-zinc-100 px-1 mb-6" > Desempenho </h2>

    {
        consumptionStats.data.length > 0 ? (
            <>
            <Card className= "p-5 pb-6" >
            <h3 className="text-zinc-300 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wide" >
                <Droplet size={ 16 } className = "text-emerald-500" />
                    Média de Consumo(km / l)
                        </h3>
                        < div className = "h-60 w-full" >
                            <ResponsiveContainer width="100%" height = "100%" >
                                <LineChart data={ consumptionStats.data } margin = {{ top: 5, right: 10, left: -25, bottom: 0 }
    }>
        <CartesianGrid strokeDasharray="3 3" stroke = "#27272a" vertical = { false} />
            <XAxis dataKey="data" stroke = "#71717a" fontSize = { 10} tickMargin = { 10} axisLine = { false} tickLine = { false} />
                <YAxis stroke="#71717a" fontSize = { 10} domain = { ['dataMin - 2', 'dataMax + 2']} axisLine = { false} tickLine = { false} />
                    <Tooltip 
                      contentStyle={ { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', color: '#f4f4f5', padding: '12px' } }
    itemStyle = {{ color: '#34d399', fontWeight: 'bold' }
}
                    />
    < Line type = "monotone" dataKey = "consumo" stroke = "#34d399" strokeWidth = { 4} dot = {{ r: 5, fill: '#18181b', strokeWidth: 3, stroke: '#34d399' }} activeDot = {{ r: 7 }} />
        </LineChart>
        </ResponsiveContainer>
        </div>
        </Card>

        < Card className = "p-5 pb-6" >
            <h3 className="text-zinc-300 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wide" >
                <MapPin size={ 16 } className = "text-orange-500" />
                    Autonomia Fechada(km)
                        </h3>
                        < div className = "h-60 w-full" >
                            <ResponsiveContainer width="100%" height = "100%" >
                                <BarChart data={ consumptionStats.data } margin = {{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke = "#27272a" vertical = { false} />
                                        <XAxis dataKey="data" stroke = "#71717a" fontSize = { 10} tickMargin = { 10} axisLine = { false} tickLine = { false} />
                                            <YAxis stroke="#71717a" fontSize = { 10} axisLine = { false} tickLine = { false} />
                                                <Tooltip 
                      contentStyle={ { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', color: '#f4f4f5', padding: '12px' } }
cursor = {{ fill: '#27272a', opacity: 0.5 }}
                    />
    < Bar dataKey = "distancia" fill = "#f97316" radius = { [6, 6, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </Card>
        </>
        ) : (
    <div className= "bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800/50 text-center flex flex-col items-center" >
    <div className="bg-zinc-800 p-4 rounded-full mb-4 text-zinc-500" >
        <BarChart3 size={ 40 } />
            </div>
            < h3 className = "text-zinc-200 font-bold mb-2" > Sem dados suficientes </h3>
                < p className = "text-sm text-zinc-500 leading-relaxed max-w-[250px]" >
                    Registre pelo menos dois "Tanques Cheios" para o app poder calcular sua média exata de consumo.
            </p>
                        </div>
        )}
</div>
    );
  };

const SettingsView = () => (
    <div className= "space-y-6 pb-28 animate-in fade-in duration-300" >
    <h2 className="text-2xl font-bold text-zinc-100 px-1 mb-6" > Configurações </h2>

        < Card className = "space-y-6" >
            <Input 
          label="Apelido da Moto"
type = "text"
value = { bikeName }
onChange = { e => setBikeName(e.target.value) }
    />

    <div>
    <label className="block text-xs font-medium text-zinc-400 mb-3 ml-1" > Estilo da Moto na Garagem </label>
        < div className = "grid grid-cols-2 gap-3" >
        {
            [
            { id: 'scooter', name: 'Scooter' },
            { id: 'cub', name: 'Motoneta (Biz)' },
            { id: 'naked', name: 'Naked / Street' },
            { id: 'sport', name: 'Esportiva' },
            { id: 'chopper', name: 'Custom / Chopper' }
            ].map(type => (
                <button
                key= { type.id }
                onClick = {() => setBikeType(type.id)}
className = {`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 ${bikeType === type.id
        ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
        : 'bg-zinc-950/50 border-zinc-800 text-zinc-500 hover:border-zinc-600'
    }`}
              >
    <div className="w-16 h-12 opacity-90 flex items-center justify-center" >
        { BikeGraphics[type.id]}
        </div>
        < span className = "text-xs font-semibold" > { type.name } </span>
            </button>
            ))}
</div>
    </div>
    </Card>
    </div>
  );

return (
    <div className= "min-h-screen bg-zinc-950 font-sans text-zinc-50 flex justify-center selection:bg-orange-500/30" >
    <div className="w-full max-w-md bg-zinc-950 min-h-screen relative flex flex-col mx-auto border-x border-zinc-900 shadow-2xl overflow-hidden" >

        {/* Header Premium */ }
        < header className = "pt-10 pb-4 px-6 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-20 border-b border-zinc-900" >
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 flex items-center gap-2" >
                MotoManager
                </h1>
                </header>

{/* Área de Conteúdo */ }
<main className="flex-1 overflow-y-auto px-5 py-6 scroll-smooth" >
    { activeTab === 'home' && <HomeView />}
{ activeTab === 'refuel' && <RefuelView /> }
{ activeTab === 'maintenance' && <MaintenanceView /> }
{ activeTab === 'stats' && <StatsView /> }
{ activeTab === 'settings' && <SettingsView /> }
</main>

{/* Nav Bar Flutuante Moderna (Pill shape) */ }
<div className="fixed bottom-6 w-full max-w-md px-5 z-50 pointer-events-none" >
    <nav className="pointer-events-auto bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-2 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.4)]" >
    {
        [
        { id: 'home', icon: Home, label: 'Início' },
        { id: 'refuel', icon: Fuel, label: 'Posto' },
        { id: 'maintenance', icon: Wrench, label: 'Oficina' },
        { id: 'stats', icon: BarChart3, label: 'Dados' },
        { id: 'settings', icon: Settings, label: 'Ajustes' },
            ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
                <button 
                  key= { tab.id }
            onClick = {() => setActiveTab(tab.id)
        }
                  className = {`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-100' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
        >
        <Icon size={ 20 } strokeWidth = { isActive? 2.5: 2 } className = { isActive? 'mb-0.5': '' } />
            { isActive && <span className="text-[9px] font-bold tracking-wide" > { tab.label } </span>}
</button>
              )
            })}
</nav>
    </div>

    </div>
    </div>
  );
}