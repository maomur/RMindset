
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Hero Section */}
      <div className="ios-card p-8 flex flex-col items-center text-center space-y-4 bg-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-400" />
        <div className="w-20 h-20 bg-blue-50 rounded-[24px] flex items-center justify-center text-blue-600 shadow-inner">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">RMindset</h2>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Versión 1.0.0 • Premium</p>
        
        <p className="text-base font-medium text-slate-700 leading-relaxed text-justify px-2 pt-2">
          Bienvenido a un espacio diseñado para transformar tu relación con la abundancia. Esta aplicación nace de una premisa poderosa: 
          <span className="text-blue-600 font-bold"> el control financiero no depende de cuánto ganas, sino de cómo lo administras.</span>
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="ios-card p-6 space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">La Metodología</h3>
            <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
              Basada en los "frascos" de T. Harv Eker, esta herramienta ha sido creada por <strong>Resumen Maestro</strong> para acompañarte en tu evolución financiera.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 shrink-0 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Nuestra Misión</h3>
            <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
              Desde Sembrador de Hábitos hasta Mente Maestra, nuestra misión es convertir el caos en claridad. Cultivas libertad, inviertes en tu mente y aprendes a disfrutar sin culpa.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Card */}
      <div className="ios-card p-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-[-10px] right-[-10px] w-24 h-24 bg-blue-500/20 blur-3xl rounded-full" />
        <p className="text-lg font-bold italic leading-tight relative z-10">
          "La disciplina es el puente hacia la libertad, y estamos aquí para ayudarte a construirlo, un frasco a la vez."
        </p>
        <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-60">Toma el control • Diseña tu futuro</p>
      </div>

      {/* Social / Contact Section */}
      <div className="space-y-3">
        <h4 className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Conecta con nosotros</h4>
        
        <a 
          href="https://resumenmaestro.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ios-card p-5 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Sitio Web</p>
              <p className="text-xs font-bold text-blue-600">resumenmaestro.com</p>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 group-hover:text-blue-600 transition-colors">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>

        <a 
          href="https://youtube.com/@resumenmaestrooficial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ios-card p-5 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">YouTube</p>
              <p className="text-xs font-bold text-red-600">@resumenmaestrooficial</p>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 group-hover:text-red-600 transition-colors">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Domina tu destino</p>
      </div>
    </div>
  );
};

export default About;
