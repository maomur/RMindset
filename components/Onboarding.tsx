
import React from 'react';

interface OnboardingProps {
  onSelect: (choice: string) => void;
}

const SeedlingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-7" />
    <path d="M12 15c-3.5 0-6-2-6-6 0-4 3-7 6-7 3 0 6 3 6 7 0 4-2.5 6-6 6Z" />
    <path d="M12 8c1.5 0 2.5 1 2.5 2.5S13.5 13 12 13" />
  </svg>
);

const ArchitectIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M15 21V9" />
  </svg>
);

const MasterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z" />
    <path d="M5 20h14" />
  </svg>
);

const Onboarding: React.FC<OnboardingProps> = ({ onSelect }) => {
  const options = [
    {
      id: 'habits',
      title: 'Sembrador de Hábitos',
      phrase: 'Tu primer paso esencial. Empieza cultivando un hábito de progreso financiero.',
      icon: <SeedlingIcon />,
      color: 'bg-emerald-50 text-emerald-600',
      border: 'border-emerald-100'
    },
    {
      id: 'architect',
      title: 'Arquitecto de Progreso',
      phrase: 'Construye tu equilibrio. Domina los frascos esenciales y avanza con estructura.',
      icon: <ArchitectIcon />,
      color: 'bg-blue-50 text-blue-600',
      border: 'border-blue-100'
    },
    {
      id: 'master',
      title: 'Mente Maestra',
      phrase: 'Alcanza el dominio total. Gestiona tus finanzas con la metodología completa de 6 frascos.',
      icon: <MasterIcon />,
      color: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="ios-card w-full max-w-sm overflow-hidden animate-slideUp shadow-2xl bg-white/95 border border-white/50">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              Bienvenido a <span className="text-blue-600">RMindset</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Elige tu nivel de gestión
            </p>
          </div>

          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`w-full text-left p-5 rounded-[24px] border ${option.border} ${option.color} transition-all active:scale-95 hover:shadow-lg flex items-center space-x-5 group`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-black uppercase text-lg tracking-tight leading-tight">
                    {option.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 leading-snug text-justify">
                    {option.phrase}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
