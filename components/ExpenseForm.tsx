
import React, { useState } from 'react';
import { Transaction, TransactionType, Category, UserLevel } from '../types';

interface ExpenseFormProps {
  onAdd: (transaction: Transaction) => void;
  balances: Record<string, number>;
  userLevel: UserLevel;
}

const ALL_CATEGORIES = [
  { cat: Category.GENERAL, label: 'Necesidades / Disponible' },
  { cat: Category.SAVINGS, label: 'Ahorro a Largo Plazo' },
  { cat: Category.CLF, label: 'Libertad Financiera' },
  { cat: Category.EDUCATION, label: 'Educación' },
  { cat: Category.PLAY, label: 'Juego / Ocio' },
  { cat: Category.GIVE, label: 'Donación' }
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd, balances, userLevel }) => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(Category.GENERAL);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const currentAmount = parseFloat(amount) || 0;

  const isCatActive = (cat: Category) => {
    if (userLevel === UserLevel.MASTER) return true;
    if (userLevel === UserLevel.ARCHITECT) return [Category.GENERAL, Category.CLF, Category.SAVINGS].includes(cat);
    if (userLevel === UserLevel.HABITS) return [Category.GENERAL, Category.SAVINGS].includes(cat);
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept || isNaN(currentAmount) || currentAmount <= 0) return;

    if (!isCatActive(category)) {
      alert("Este frasco no está activo en tu nivel actual.");
      return;
    }

    if (currentAmount > (balances[category] || 0)) {
      alert("No tienes fondos suficientes en este frasco.");
      return;
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      concept,
      amount: currentAmount,
      date,
      type: TransactionType.EXPENSE,
      category
    };

    onAdd(newTransaction);
    setConcept('');
    setAmount('');
  };

  const isOptionDisabled = (cat: Category) => {
    if (!isCatActive(cat)) return true;
    if (!amount) return false;
    return currentAmount > (balances[cat] || 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slideUp">
      <div className="ios-card p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900">Nuevo Gasto</h2>
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Concepto</label>
          <input type="text" value={concept} onChange={(e) => setConcept(e.target.value)} className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold" placeholder="Comida, Ropa, Otros..." required />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Monto ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none font-black text-2xl" placeholder="0.00" required />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Frasco de Origen</label>
          <div className="relative">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as Category)} 
              className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold appearance-none"
            >
              {ALL_CATEGORIES.map(opt => (
                <option 
                  key={opt.cat} 
                  value={opt.cat} 
                  disabled={isOptionDisabled(opt.cat)}
                  className={!isCatActive(opt.cat) ? 'text-gray-300' : ''}
                >
                  {!isCatActive(opt.cat) ? '🔒 ' : ''}{opt.label} (${(balances[opt.cat] || 0).toLocaleString()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Fecha del gasto</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none font-bold" required />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isOptionDisabled(category)}
        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-lg active:scale-95 transition-transform uppercase tracking-widest disabled:bg-gray-400"
      >
        {isOptionDisabled(category) ? (isCatActive(category) ? 'Fondos Insuficientes' : 'Frasco Inactivo') : 'Registrar Salida'}
      </button>
    </form>
  );
};

export default ExpenseForm;
