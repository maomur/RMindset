
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType, Category, UserLevel } from './types';
import Dashboard from './components/Dashboard';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import JarsInfo from './components/JarsInfo';
import TopMenu from './components/TopMenu';
import Onboarding from './components/Onboarding';
import About from './components/About';
import Tutorial from './components/Tutorial';

export type Tab = 'dashboard' | 'income' | 'expense' | 'jars' | 'about' | 'tutorial';

export const LEVEL_RULES = {
  [UserLevel.HABITS]: [
    { cat: Category.SAVINGS, p: 0.10, label: 'Ahorro' },
    { cat: Category.GENERAL, p: 0.90, label: 'Gasto Base' }
  ],
  [UserLevel.ARCHITECT]: [
    { cat: Category.SAVINGS, p: 0.10, label: 'Ahorro' },
    { cat: Category.CLF, p: 0.10, label: 'Libertad' },
    { cat: Category.GENERAL, p: 0.80, label: 'Gasto Base' }
  ],
  [UserLevel.MASTER]: [
    { cat: Category.GENERAL, p: 0.55, label: 'Necesidades' },
    { cat: Category.CLF, p: 0.10, label: 'Libertad' },
    { cat: Category.EDUCATION, p: 0.10, label: 'Educación' },
    { cat: Category.SAVINGS, p: 0.10, label: 'Ahorro' },
    { cat: Category.PLAY, p: 0.10, label: 'Juego' },
    { cat: Category.GIVE, p: 0.05, label: 'Donación' }
  ]
};

const App: React.FC = () => {
  // Inicialización de estados
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('rmindset_transactions');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [userLevel, setUserLevel] = useState<UserLevel>(() => {
    return (localStorage.getItem('rmindset_onboarded') as UserLevel) || UserLevel.MASTER;
  });

  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('rmindset_onboarded');
  });

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Guardar cambios automáticamente
  useEffect(() => {
    localStorage.setItem('rmindset_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const reallocateAllFunds = (newLevel: UserLevel, currentTransactions: Transaction[]) => {
    const rules = LEVEL_RULES[newLevel];
    if (!rules) return currentTransactions;

    const activeCategories = rules.map(r => r.cat);
    const incomeGroups: Record<string, { total: number, concept: string, date: string }> = {};
    const otherTransactions: Transaction[] = [];

    currentTransactions.forEach(t => {
      if (t.type === TransactionType.INCOME && t.parentIncomeId) {
        if (!incomeGroups[t.parentIncomeId]) {
          const cleanConcept = t.concept.split(' (')[0];
          incomeGroups[t.parentIncomeId] = { total: 0, concept: cleanConcept, date: t.date };
        }
        incomeGroups[t.parentIncomeId].total += t.amount;
      } else {
        otherTransactions.push(t);
      }
    });

    const newIncomes: Transaction[] = [];
    Object.entries(incomeGroups).forEach(([parentId, data]) => {
      rules.forEach(rule => {
        newIncomes.push({
          id: Math.random().toString(36).substr(2, 9),
          concept: `${data.concept} (${rule.label})`,
          amount: data.total * rule.p,
          date: data.date,
          type: TransactionType.INCOME,
          category: rule.cat,
          parentIncomeId: parentId
        });
      });
    });

    const adjustedExpenses = otherTransactions.map(t => {
      if (t.type === TransactionType.EXPENSE && !activeCategories.includes(t.category)) {
        return { ...t, category: Category.GENERAL };
      }
      return t;
    });

    return [...newIncomes, ...adjustedExpenses];
  };

  const handleOnboardingComplete = (choice: string) => {
    const level = choice as UserLevel;
    localStorage.setItem('rmindset_onboarded', level);
    setUserLevel(level);
    const reallocated = reallocateAllFunds(level, transactions);
    setTransactions(reallocated);
    setShowOnboarding(false);
  };

  const handleLevelChange = (level: UserLevel) => {
    localStorage.setItem('rmindset_onboarded', level);
    const reallocated = reallocateAllFunds(level, transactions);
    setTransactions(reallocated);
    setUserLevel(level);
    setActiveTab('dashboard');
    setIsMenuOpen(false);
  };

  // REINICIO SUAVE: No rompe la conexión con el servidor
  const clearAllData = () => {
    localStorage.removeItem('rmindset_transactions');
    localStorage.removeItem('rmindset_onboarded');
    
    // Resetear estados manualmente en lugar de recargar la página
    setTransactions([]);
    setUserLevel(UserLevel.MASTER);
    setShowOnboarding(true);
    setActiveTab('dashboard');
    setIsMenuOpen(false);
  };

  const balances = transactions.reduce((acc, t) => {
    const amt = t.type === TransactionType.INCOME ? t.amount : -t.amount;
    acc[t.category] = (acc[t.category] || 0) + amt;
    return acc;
  }, {} as Record<string, number>);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            transactions={transactions} 
            onDelete={(id) => setTransactions(prev => prev.filter(t => t.id !== id))} 
            onClearAll={clearAllData}
            userLevel={userLevel}
          />
        );
      case 'income':
        return <IncomeForm onAdd={(ts) => { setTransactions(prev => [...prev, ...ts]); setActiveTab('dashboard'); }} userLevel={userLevel} />;
      case 'expense':
        return <ExpenseForm onAdd={(t) => { setTransactions(prev => [...prev, t]); setActiveTab('dashboard'); }} balances={balances} userLevel={userLevel} />;
      case 'jars':
        return <JarsInfo />;
      case 'about':
        return <About />;
      case 'tutorial':
        return <Tutorial />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-[#F2F2F7] overflow-hidden relative">
      {showOnboarding && <Onboarding onSelect={handleOnboardingComplete} />}
      
      <header className="ios-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-200/50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="active:opacity-60 transition-opacity"
        >
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">RMindset</h1>
        </button>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 ${isMenuOpen ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-gray-200 shadow-sm'}`}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </header>

      <TopMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(tab) => { setActiveTab(tab); setIsMenuOpen(false); }}
        onLevelChange={handleLevelChange}
        currentLevel={userLevel}
      />

      <main className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        {renderContent()}
      </main>

      <nav className="ios-blur fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-gray-200/50 px-6 py-3 pb-6 flex justify-between items-center z-40">
        <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} label="Inicio" icon={<HomeIcon />} />
        <NavButton active={activeTab === 'income'} onClick={() => setActiveTab('income')} label="Ingreso" icon={<IncomeIcon />} />
        <NavButton active={activeTab === 'expense'} onClick={() => setActiveTab('expense')} label="Gasto" icon={<ExpenseIcon />} />
        <NavButton active={activeTab === 'jars'} onClick={() => setActiveTab('jars')} label="Frascos" icon={<JarsIcon />} />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button onClick={onClick} className={`flex flex-col items-center space-y-1 transition-all ${active ? 'text-blue-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
    <div className={`w-6 h-6 ${active ? 'fill-current' : 'fill-none'}`}>{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
  </svg>
);

const IncomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ExpenseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const JarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 8v10a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8" />
    <path d="M5 8h14" />
    <rect x="8" y="3" width="8" height="5" rx="1.5" />
    <path d="M12 12v3" />
  </svg>
);

export default App;
