import React, { useState, useEffect } from "react";
import { Transaction, TransactionType, Category, UserLevel } from "./types";
import Dashboard from "./components/Dashboard";
import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import JarsInfo from "./components/JarsInfo";
import TopMenu from "./components/TopMenu";
import Onboarding from "./components/Onboarding";
import About from "./components/About";
import Tutorial from "./components/Tutorial";

export type Tab =
  | "dashboard"
  | "income"
  | "expense"
  | "jars"
  | "about"
  | "tutorial";

export const LEVEL_RULES = {
  [UserLevel.HABITS]: [
    { cat: Category.SAVINGS, p: 0.1, label: "Ahorro" },
    { cat: Category.GENERAL, p: 0.9, label: "Gasto Base" },
  ],
  [UserLevel.ARCHITECT]: [
    { cat: Category.SAVINGS, p: 0.1, label: "Ahorro" },
    { cat: Category.CLF, p: 0.1, label: "Libertad" },
    { cat: Category.GENERAL, p: 0.8, label: "Gasto Base" },
  ],
  [UserLevel.MASTER]: [
    { cat: Category.GENERAL, p: 0.55, label: "Necesidades" },
    { cat: Category.CLF, p: 0.1, label: "Libertad" },
    { cat: Category.EDUCATION, p: 0.1, label: "Educación" },
    { cat: Category.SAVINGS, p: 0.1, label: "Ahorro" },
    { cat: Category.PLAY, p: 0.1, label: "Juego" },
    { cat: Category.GIVE, p: 0.05, label: "Donación" },
  ],
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("rmindset_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [userLevel, setUserLevel] = useState<UserLevel>(() => {
    return (
      (localStorage.getItem("rmindset_onboarded") as UserLevel) ||
      UserLevel.MASTER
    );
  });

  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem("rmindset_onboarded"),
  );
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("rmindset_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleLevelChange = (level: UserLevel) => {
    localStorage.setItem("rmindset_onboarded", level);
    setUserLevel(level);
    setIsMenuOpen(false);
    setActiveTab("dashboard");
  };

  const clearAllData = () => {
    setTransactions([]);
    localStorage.clear();
    setShowOnboarding(true);
    setActiveTab("dashboard");
  };

  const renderContent = () => {
    const balances = transactions.reduce(
      (acc, t) => {
        const amt = t.type === TransactionType.INCOME ? t.amount : -t.amount;
        acc[t.category] = (acc[t.category] || 0) + amt;
        return acc;
      },
      {} as Record<string, number>,
    );

    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            transactions={transactions}
            onDelete={(id) =>
              setTransactions((prev) => prev.filter((t) => t.id !== id))
            }
            onClearAll={clearAllData}
            userLevel={userLevel}
          />
        );
      case "income":
        return (
          <IncomeForm
            onAdd={(ts) => {
              setTransactions((prev) => [...prev, ...ts]);
              setActiveTab("dashboard");
            }}
            userLevel={userLevel}
          />
        );
      case "expense":
        return (
          <ExpenseForm
            onAdd={(t) => {
              setTransactions((prev) => [...prev, t]);
              setActiveTab("dashboard");
            }}
            balances={balances}
            userLevel={userLevel}
          />
        );
      case "jars":
        return <JarsInfo />;
      case "about":
        return <About />;
      case "tutorial":
        return <Tutorial />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-ios-background overflow-hidden relative font-sans">
      {showOnboarding && (
        <Onboarding
          onSelect={(l) => {
            setUserLevel(l as UserLevel);
            localStorage.setItem("rmindset_onboarded", l);
            setShowOnboarding(false);
          }}
        />
      )}

      <header className="ios-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-gray-200/30">
        <button
          onClick={() => setActiveTab("dashboard")}
          className="hover:opacity-70 transition-opacity"
        >
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">
            RMindset
          </h1>
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 transition-transform active:scale-90`}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span
              className={`h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"}`}
            />
            <span
              className={`h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-4"}`}
            />
            <span
              className={`h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? "w-6 -translate-y-2.5 -rotate-45" : "w-5"}`}
            />
          </div>
        </button>
      </header>

      <TopMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setActiveTab}
        onLevelChange={handleLevelChange}
        currentLevel={userLevel}
      />

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {renderContent()}
      </main>

      <nav className="ios-blur fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t border-gray-200/30 px-6 py-3 pb-8 flex justify-around items-center z-40">
        <NavButton
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
          label="Inicio"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          }
        />
        <NavButton
          active={activeTab === "income"}
          onClick={() => setActiveTab("income")}
          label="Ingreso"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        />
        <NavButton
          active={activeTab === "expense"}
          onClick={() => setActiveTab("expense")}
          label="Gasto"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              />
            </svg>
          }
        />
        <NavButton
          active={activeTab === "jars"}
          onClick={() => setActiveTab("jars")}
          label="Método"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}> = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all ${active ? "text-ios-blue" : "text-gray-400"}`}
  >
    {icon}
    <span className="text-[10px] font-semibold">{label}</span>
  </button>
);

export default App;
