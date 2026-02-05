
import React, { useState } from 'react';
import { Transaction, TransactionType, UserLevel } from '../types';
import { LEVEL_RULES } from '../App';

interface IncomeFormProps {
  onAdd: (transactions: Transaction[]) => void;
  userLevel: UserLevel;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onAdd, userLevel }) => {
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(amount);
    if (!concept || isNaN(total) || total <= 0) return;

    // Usar las reglas dinámicas desde App
    const dist = LEVEL_RULES[userLevel];

    const parentId = Math.random().toString(36).substr(2, 9);
    const newTransactions: Transaction[] = dist.map(d => ({
      id: Math.random().toString(36).substr(2, 9),
      concept: `${concept} (${d.label})`,
      amount: total * d.p,
      date,
      type: TransactionType.INCOME,
      category: d.cat,
      parentIncomeId: parentId
    }));

    onAdd(newTransactions);
    setConcept('');
    setAmount('');
  };

  const getHint = () => {
    const rules = LEVEL_RULES[userLevel];
    return rules.map(r => `${(r.p * 100).toFixed(0)}% ${r.label}`).join(', ') + '.';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slideUp">
      <div className="ios-card p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900">Nuevo Ingreso</h2>
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Concepto</label>
          <input type="text" value={concept} onChange={(e) => setConcept(e.target.value)} className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold" placeholder="Salario, Venta, Regalo..." required />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Monto Total ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-black text-2xl" placeholder="0.00" required />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Fecha de recepción</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-4 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold" required />
        </div>
      </div>

      <div className="ios-card p-5 bg-blue-50 border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="text-blue-600 mt-1 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m9.9 9.9l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <p className="text-[14px] font-black text-blue-600 uppercase tracking-tight">
              Distribución Automática ({userLevel === UserLevel.HABITS ? 'Nivel 1' : userLevel === UserLevel.ARCHITECT ? 'Nivel 2' : 'Nivel 3'})
            </p>
            <p className="text-base font-bold text-blue-800 leading-tight">
              {getHint()}
            </p>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-blue-200 active:scale-95 transition-transform uppercase tracking-widest">
        Distribuir Ahora
      </button>
    </form>
  );
};

export default IncomeForm;
