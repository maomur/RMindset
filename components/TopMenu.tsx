
import React from 'react';
import { UserLevel } from '../types';
import { Tab } from '../App';

interface TopMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: Tab) => void;
  onLevelChange: (level: UserLevel) => void;
  currentLevel: UserLevel;
}

const SeedlingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22v-7" />
    <path d="M12 15c-3.5 0-6-2-6-6 0-4 3-7 6-7 3 0 6 3 6 7 0 4-2.5 6-6 6Z" />
  </svg>
);

const ArchitectIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M15 21V9" />
  </svg>
);

const MasterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z" />
    <path d="M5 20h14" />
  </svg>
);

const TopMenu: React.FC<TopMenuProps> = ({ isOpen, onClose, onNavigate, onLevelChange, currentLevel }) => {
  if (!isOpen) return null;

  const MenuItem: React.FC<{ 
    title: string; 
    icon: React.ReactNode; 
    onClick: () => void; 
    active?: boolean;
    subtitle?: string;
  }> = ({ title, icon, onClick, active, subtitle }) => (
    <button 
      onClick={onClick}
      className={`w-full p-4 flex items-center justify-between text-left transition-all active:scale-[0.98] ${active ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
          {icon}
        </div>
        <div>
          <p className={`text-base font-black uppercase tracking-tight ${active ? 'text-blue-600' : 'text-slate-800'}`}>
            {title}
          </p>
          {subtitle && <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{subtitle}</p>}
        </div>
      </div>
      {active && (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      <div className="absolute top-[73px] left-0 right-0 z-50 animate-slideDown px-6">
        <div className="ios-card shadow-2xl border border-gray-200/50 overflow-hidden divide-y divide-gray-100">
          {/* Navegación Principal */}
          <MenuItem 
            title="Inicio" 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>}
            onClick={() => onNavigate('dashboard')}
          />

          {/* Niveles */}
          <div className="bg-gray-50/30">
            <MenuItem 
              title="Sembrador de Hábitos" 
              icon={<SeedlingIcon />}
              onClick={() => onLevelChange(UserLevel.HABITS)}
              active={currentLevel === UserLevel.HABITS}
              subtitle="Nivel 1"
            />
            <MenuItem 
              title="Arquitecto de Progreso" 
              icon={<ArchitectIcon />}
              onClick={() => onLevelChange(UserLevel.ARCHITECT)}
              active={currentLevel === UserLevel.ARCHITECT}
              subtitle="Nivel 2"
            />
            <MenuItem 
              title="Mente Maestra" 
              icon={<MasterIcon />}
              onClick={() => onLevelChange(UserLevel.MASTER)}
              active={currentLevel === UserLevel.MASTER}
              subtitle="Nivel 3"
            />
          </div>

          {/* Acerca de */}
          <MenuItem 
            title="Acerca de" 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
            onClick={() => onNavigate('about')}
          />

          {/* Tutorial */}
          <MenuItem 
            title="Tutorial" 
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
            onClick={() => onNavigate('tutorial')}
          />
        </div>
      </div>
    </>
  );
};

export default TopMenu;
