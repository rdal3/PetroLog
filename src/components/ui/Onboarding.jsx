import { useState } from 'react';
import { Fuel, BarChart3, Wrench, Gauge, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const slides = [
    {
        icon: Gauge,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10 border-orange-500/20',
        title: 'Bem-vindo ao PetroLog!',
        description: 'Gerencie sua moto de forma inteligente. Acompanhe abastecimentos, manutenções e veja o desempenho da sua motoca.',
    },
    {
        icon: Fuel,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        title: 'Controle de Combustível',
        description: 'Registre cada abastecimento. Encha o tanque para que o app calcule sua média real de km/l. Acompanhe o custo por litro.',
    },
    {
        icon: Wrench,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        title: 'Manutenções Inteligentes',
        description: 'Cadastre serviços e defina o km da próxima troca. O app te avisa quando estiver chegando a hora!',
    },
    {
        icon: BarChart3,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
        title: 'Estatísticas Detalhadas',
        description: 'Gráficos de consumo, autonomia, custo por km e comparativo mensal. Tudo para você conhecer sua moto a fundo.',
    },
];

export function Onboarding() {
    const { setOnboardingDone } = useApp();
    const [current, setCurrent] = useState(0);

    const slide = slides[current];
    const Icon = slide.icon;
    const isLast = current === slides.length - 1;

    const next = () => {
        if (isLast) {
            setOnboardingDone(true);
        } else {
            setCurrent(prev => prev + 1);
        }
    };

    const skip = () => setOnboardingDone(true);

    return (
        <div className="fixed inset-0 z-[300] theme-bg flex items-center justify-center p-6">
            <div className="w-full max-w-sm flex flex-col items-center text-center">

                {/* Icon */}
                <div key={current} className="animate-onboarding">
                    <div className={`${slide.bg} border p-8 rounded-full mb-8`}>
                        <Icon size={56} className={slide.color} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Content */}
                <div key={`text-${current}`} className="animate-onboarding">
                    <h2 className="text-2xl font-bold theme-text mb-3">{slide.title}</h2>
                    <p className="theme-text-secondary text-sm leading-relaxed mb-10 max-w-[280px] mx-auto">{slide.description}</p>
                </div>

                {/* Dots */}
                <div className="flex items-center gap-2 mb-8">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-orange-500' : 'w-2 h-2 bg-zinc-600'}`}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 w-full">
                    {!isLast && (
                        <button onClick={skip} className="flex-1 py-3.5 rounded-2xl theme-text-muted text-sm font-medium">
                            Pular
                        </button>
                    )}
                    <button
                        onClick={next}
                        className={`${isLast ? 'w-full' : 'flex-1'} py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2`}
                    >
                        {isLast ? 'Começar!' : 'Próximo'}
                        {!isLast && <ChevronRight size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
