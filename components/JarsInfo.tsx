import React from "react";

const JARS_DATA = [
  {
    title: "Necesidades Básicas",
    percentage: "55%",
    description:
      "Tu Base de Operaciones. Aquí va el combustible diario: renta, comida, servicios y deudas corrientes. El objetivo es que tu estilo de vida encaje en este porcentaje.",
    gradient: "from-blue-600 to-blue-400",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Libertad Financiera",
    percentage: "10%",
    description:
      "Tu Máquina de Dinero. Su única función es generar riqueza mediante inversiones. Nunca se gasta el capital, solo se reinvierten los rendimientos.",
    gradient: "from-emerald-600 to-teal-400",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Educación y Crecimiento",
    percentage: "10%",
    description:
      "Tu Activo Más Valioso. El mercado paga por el valor que aportas. Úsalo para seminarios, libros o mentorías. ¡Invierte en tu mente!",
    gradient: "from-purple-600 to-indigo-400",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: "Ahorro a Largo Plazo",
    percentage: "10%",
    description:
      "Paz Mental y Proyectos Grandes. Construye tu fondo de emergencia o junta capital para compras importantes sin pagar intereses.",
    gradient: "from-orange-600 to-yellow-400",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Ocio y Diversión",
    percentage: "10%",
    description:
      "El Premio al Esfuerzo. Para mantener un mindset ganador, necesitas dopamina sana. Gástalo sin culpa cada mes en tus caprichos.",
    gradient: "from-pink-600 to-rose-400",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: "Donaciones",
    percentage: "5%",
    description:
      "El Ciclo de la Abundancia. Compartir reprograma tu subconsciente para entender que siempre tienes suficiente y más.",
    gradient: "from-red-600 to-orange-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const JarsInfo: React.FC = () => {
  return (
    <div className="space-y-8 pb-20 animate-ios-in">
      <div className="text-center pt-4">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">
          Método de los Frascos
        </h1>
        <p className="text-[15px] text-slate-500 mt-2 px-6">
          "La libertad no es tener mucho, es saber administrar lo que tienes."
        </p>
      </div>

      <div className="space-y-4">
        {JARS_DATA.map((jar, index) => (
          <div key={index} className="ios-card overflow-hidden">
            <div className="p-5 flex items-start space-x-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${jar.gradient} text-white shadow-sm`}
              >
                {jar.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[17px] font-bold text-slate-900">
                    {jar.title}
                  </h3>
                  <span className="text-ios-blue font-bold text-[15px]">
                    {jar.percentage}
                  </span>
                </div>
                <p className="text-[14px] text-slate-500 leading-snug font-medium">
                  {jar.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JarsInfo;
