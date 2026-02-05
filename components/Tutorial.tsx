import React from "react";

const Tutorial: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Hero Section */}
      <div className="ios-card p-8 flex flex-col items-center text-center space-y-4 bg-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-400" />
        <div className="w-20 h-20 bg-blue-50 rounded-[24px] flex items-center justify-center text-blue-600 shadow-inner">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Guía de Dominio
        </h2>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">
          Entrena tu mente para la abundancia
        </p>

        <p className="text-base font-medium text-slate-700 leading-relaxed text-justify px-2 pt-2">
          ¡Bienvenido a bordo! Estás a punto de implementar el sistema de
          gestión de dinero más efectivo del mundo. No se trata solo de números,
          se trata de <strong>entrenar tu mente para la abundancia.</strong>
        </p>
      </div>

      {/* Levels Section */}
      <div className="space-y-3">
        <h4 className="text-center text-[14px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Puntos de Partida (Niveles)
        </h4>

        <div className="ios-card p-5 border-l-4 border-emerald-500">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-emerald-600 font-black text-xs uppercase bg-emerald-50 px-2 py-0.5 rounded-full">
              Nivel 1
            </span>
            <h3 className="font-black text-slate-900 uppercase tracking-tight">
              Sembrador de Hábitos
            </h3>
          </div>
          <p className="text-[14px] font-medium text-slate-600 leading-relaxed text-justify">
            Si te cuesta ahorrar, empieza aquí. Solo un 10% va al frasco de
            Ahorro. El objetivo es crear la rutina sin agobios.
          </p>
        </div>

        <div className="ios-card p-5 border-l-4 border-blue-500">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-blue-600 font-black text-xs uppercase bg-blue-50 px-2 py-0.5 rounded-full">
              Nivel 2
            </span>
            <h3 className="font-black text-slate-900 uppercase tracking-tight">
              Arquitecto de Progreso
            </h3>
          </div>
          <p className="text-[14px] font-medium text-slate-600 leading-relaxed text-justify">
            Este nivel añade el frasco de Libertad Financiera. Aquí empiezas a
            construir el capital que trabajará por ti en el futuro.
          </p>
        </div>

        <div className="ios-card p-5 border-l-4 border-amber-500">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-amber-600 font-black text-xs uppercase bg-amber-50 px-2 py-0.5 rounded-full">
              Nivel 3
            </span>
            <h3 className="font-black text-slate-900 uppercase tracking-tight">
              Mente Maestra
            </h3>
          </div>
          <p className="text-[14px] font-medium text-slate-600 leading-relaxed text-justify">
            Nivel avanzado. Distribuyes el 100% de tus ingresos en 6 frascos
            específicos. Es el control total y la maestría absoluta.
          </p>
        </div>
      </div>

      {/* Income Registration */}
      <div className="ios-card p-6 bg-white space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
            Registro de Ingresos
          </h3>
        </div>
        <p className="text-[14px] font-medium text-slate-600 leading-relaxed text-justify">
          Cada vez que recibas dinero, ingrésalo en la aplicación. Nuestra IA
          calculará instantáneamente la distribución exacta según tu nivel
          actual.
          <strong> No tienes que hacer cálculos manuales</strong>, nosotros nos
          encargamos de la matemática.
        </p>
      </div>

      {/* Jars Breakdown */}
      <div className="space-y-3">
        <h4 className="text-center text-[14px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Propósito de cada Frasco
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              title: "Libertad Financiera",
              desc: "Este dinero 'nunca se gasta'. Solo se invierte para generar ingresos pasivos. Es tu gallina de los huevos de oro.",
              color: "text-emerald-600",
              bgColor: "bg-emerald-50",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              ),
            },
            {
              title: "Ahorro a Largo Plazo",
              desc: "Para compras grandes, emergencias o metas futuras.",
              color: "text-orange-600",
              bgColor: "bg-orange-50",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              title: "Educación",
              desc: "Para libros, cursos y seminarios. Tu mente es tu activo más rentable.",
              color: "text-indigo-600",
              bgColor: "bg-indigo-50",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              ),
            },
            {
              title: "Juego (Ocio)",
              desc: "¡Obligatorio gastarlo! Alimenta tu espíritu y evita que te sientas privado.",
              color: "text-pink-600",
              bgColor: "bg-pink-50",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              ),
            },
            {
              title: "Donación",
              desc: "La ley de la abundancia dice que para recibir, hay que dar.",
              color: "text-red-600",
              bgColor: "bg-red-50",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              title: "Necesidades",
              desc: "El 55% destinado a vivir (arriendo, comida, servicios).",
              color: "text-blue-600",
              bgColor: "bg-blue-50",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ),
            },
          ].map((j, i) => (
            <div key={i} className="ios-card p-5 flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${j.bgColor} ${j.color}`}
              >
                <div className="w-6 h-6">{j.icon}</div>
              </div>
              <div className="space-y-1 flex-1">
                <h5
                  className={`text-xs font-black uppercase tracking-tight ${j.color}`}
                >
                  {j.title}
                </h5>
                <p className="text-[12px] font-medium text-slate-500 leading-snug text-justify">
                  {j.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Section */}
      <div className="ios-card p-6 bg-slate-50 border border-slate-200">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
          Evolución Constante
        </h3>
        <p className="text-[14px] font-medium text-slate-600 leading-relaxed text-justify">
          Si sientes que tus gastos actuales superan el 55%, no te castigues.
          Empieza en un nivel inferior y ve ajustando tu estilo de vida hasta
          que logres la maestría total.
        </p>
      </div>

      {/* Tip Card */}
      <div className="ios-card p-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">
            Consejo de Resumen Maestro
          </p>
        </div>
        <p className="text-lg font-bold leading-tight relative z-10 italic text-justify">
          "La gestión es un hábito, no un evento. No importa si registras 1
          dólar o 1,000; lo que cuenta es que le digas a tu dinero exactamente a
          dónde ir, en lugar de preguntarte a dónde se fue."
        </p>
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
          Domina tu destino
        </p>
      </div>
    </div>
  );
};

export default Tutorial;
