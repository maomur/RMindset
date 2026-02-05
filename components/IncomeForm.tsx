import React, { useState } from "react";
import { Transaction, TransactionType, UserLevel } from "../types";
import { LEVEL_RULES } from "../App";

interface IncomeFormProps {
  onAdd: (transactions: Transaction[]) => void;
  userLevel: UserLevel;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onAdd, userLevel }) => {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(amount);
    if (!concept || isNaN(total) || total <= 0) return;

    const rules = LEVEL_RULES[userLevel];
    const parentId = Math.random().toString(36).substr(2, 9);
    const newTransactions = rules.map((d) => ({
      id: Math.random().toString(36).substr(2, 9),
      concept: `${concept} (${d.label})`,
      amount: total * d.p,
      date,
      type: TransactionType.INCOME,
      category: d.cat,
      parentIncomeId: parentId,
    }));

    onAdd(newTransactions);
  };

  return (
    <div className="space-y-6 animate-ios-in">
      <div className="ios-card p-6 space-y-6">
        <h2 className="text-[20px] font-bold">Registrar Ingreso</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">
              Concepto
            </label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="ios-input w-full"
              placeholder="Ej: Salario"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">
              Monto ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="ios-input w-full text-2xl font-semibold"
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-500 ml-1">
              Fecha
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ios-input w-full"
              required
            />
          </div>

          <button type="submit" className="ios-btn-primary w-full mt-4">
            Distribuir Ingreso
          </button>
        </form>
      </div>

      <div className="p-5 bg-blue-50/50 rounded-ios-lg border border-blue-100/50">
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">
          Nota
        </p>
        <p className="text-[14px] text-blue-800 leading-snug font-medium">
          El monto se dividirá automáticamente según tu nivel actual (
          {userLevel.toUpperCase()}).
        </p>
      </div>
    </div>
  );
};

export default IncomeForm;
