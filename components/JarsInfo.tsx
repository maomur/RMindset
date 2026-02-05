
import React from 'react';

const JARS_DATA = [
  {
    title: "1. NECESIDADES BÁSICAS (55%)",
    description: "Tu Base de Operaciones. Aquí va el combustible diario: renta, comida, servicios y deudas corrientes. El objetivo es que tu estilo de vida encaje en este porcentaje. Si te sobra, ¡va para Libertad Financiera! Si te falta, es hora de auditar tus gastos o hackear tus ingresos para recuperar el equilibrio.",
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    title: "2. LIBERTAD FINANCIERA (10%)",
    description: "Tu Máquina de Dinero. Este es el frasco más sagrado. Su única función es generar más riqueza mediante inversiones (acciones, negocios, activos o bienes raíces). Nunca se gasta el capital, solo se reinvierten los rendimientos. Es el pago mensual para comprar tu jubilación anticipada y tu paz futura.",
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-teal-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: "3. EDUCACIÓN Y CRECIMIENTO (10%)",
    description: "Tu Activo Más Valioso. El mercado paga por el valor que aportas, y solo aportas más valor si sabes más. Úsalo para seminarios, libros, herramientas o mentorías. Si dejas de aprender, tu capacidad de generar ingresos se estanca. ¡Invierte en tu mente y ella se encargará de llenar tus bolsillos!",
    color: "bg-purple-600",
    gradient: "from-purple-600 to-indigo-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
  {
    title: "4. AHORRO A LARGO PLAZO (10%)",
    description: "Paz Mental y Proyectos Grandes. No es ahorro por ahorrar; es ahorro con intención. Aquí construyes tu fondo de emergencia o juntas el capital para esas compras importantes que no quieres pagar con intereses. Es el escudo que te protege de imprevistos y te permite dormir tranquilo por las noches.",
    color: "bg-orange-600",
    gradient: "from-orange-600 to-yellow-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: "5. OCIO Y DIVERSIÓN (10%)",
    description: "El Premio al Esfuerzo. Para mantener un mindset ganador, necesitas dopamina sana. Este frasco es para darte lujos, cenas o ese capricho que tanto quieres. La regla de oro: gástalo sin culpa cada mes. Si no te premias por tu disciplina, tu cerebro se rebelará y terminarás abandonando el sistema.",
    color: "bg-pink-600",
    gradient: "from-pink-600 to-rose-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    title: "6. DONACIONES Y CONTRIBUCIÓN (5%)",
    description: "El Ciclo de la Abundancia. La mentalidad de escasez acumula con miedo; la de abundancia comparte con confianza. Ayudar a otros no solo mejora tu entorno, sino que reprograma tu subconsciente para entender que siempre tienes suficiente y más. Dar es la declaración de riqueza más poderosa que existe.",
    color: "bg-red-600",
    gradient: "from-red-600 to-orange-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
];

const JarsInfo: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Seccion */}
      <div className="text-center pt-4 space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
          EL MÉTODO DE <span className="text-blue-600">LOS FRASCOS</span>
        </h1>
        <div className="px-10 relative">
           <p className="text-sm font-bold italic text-slate-500 leading-tight">
            "La libertad no es tener mucho, es saber administrar lo que tienes."
           </p>
        </div>
      </div>

      {/* Lista de Frascos */}
      <div className="space-y-4">
        {JARS_DATA.map((jar, index) => (
          <div 
            key={index} 
            className="group ios-card overflow-hidden border border-gray-100/50 hover:border-gray-200 transition-all duration-300 shadow-sm"
          >
            <div className={`h-1.5 bg-gradient-to-r ${jar.gradient}`} />
            <div className="p-5">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0 bg-gradient-to-br ${jar.gradient} text-white`}>
                  {jar.icon}
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight">
                    {jar.title}
                  </h3>
                  <p className="text-[13px] font-medium text-slate-600 leading-relaxed text-justify">
                    {jar.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JarsInfo;
