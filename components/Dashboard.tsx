import React, { useMemo, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Transaction, TransactionType, Category, UserLevel } from "../types";

interface DashboardProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
  onClearAll?: () => void;
  userLevel: UserLevel;
}

const CATEGORY_COLORS: Record<string, string> = {
  [Category.GENERAL]: "#007AFF",
  [Category.CLF]: "#34C759",
  [Category.SAVINGS]: "#FF9500",
  [Category.EDUCATION]: "#5856D6",
  [Category.PLAY]: "#FF2D55",
  [Category.GIVE]: "#FF3B30",
};

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  onDelete,
  onClearAll,
  userLevel,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const stats = useMemo(() => {
    const incomes = transactions.filter(
      (t) => t.type === TransactionType.INCOME,
    );
    const totalIncome = incomes.reduce((acc, t) => acc + t.amount, 0);

    const jarBalances = {
      clf: transactions
        .filter((t) => t.category === Category.CLF)
        .reduce(
          (acc, t) =>
            acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount),
          0,
        ),
      play: transactions
        .filter((t) => t.category === Category.PLAY)
        .reduce(
          (acc, t) =>
            acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount),
          0,
        ),
      savings: transactions
        .filter((t) => t.category === Category.SAVINGS)
        .reduce(
          (acc, t) =>
            acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount),
          0,
        ),
      edu: transactions
        .filter((t) => t.category === Category.EDUCATION)
        .reduce(
          (acc, t) =>
            acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount),
          0,
        ),
      give: transactions
        .filter((t) => t.category === Category.GIVE)
        .reduce(
          (acc, t) =>
            acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount),
          0,
        ),
      general: transactions
        .filter((t) => t.category === Category.GENERAL)
        .reduce(
          (acc, t) =>
            acc + (t.type === TransactionType.INCOME ? t.amount : -t.amount),
          0,
        ),
    };

    let score = 0;
    if (totalIncome > 0) {
      const totalSavings =
        jarBalances.clf +
        jarBalances.savings +
        jarBalances.edu +
        jarBalances.give;
      const ratio = totalSavings / totalIncome;
      if (userLevel === UserLevel.HABITS)
        score = ratio >= 0.1 ? 10 : Math.floor(ratio * 100);
      else if (userLevel === UserLevel.ARCHITECT)
        score = ratio >= 0.2 ? 10 : Math.floor(ratio * 50);
      else score = ratio >= 0.4 ? 10 : Math.floor(ratio * 25);
    }
    score = Math.min(10, Math.max(0, score));

    let statusStyle = {
      bg: "bg-ios-blue",
      msg: "Gestión impecable.",
    };

    if (score < 5) {
      statusStyle = { bg: "bg-ios-red", msg: "Revisa tus prioridades." };
    } else if (score < 8) {
      statusStyle = { bg: "bg-ios-orange", msg: "Mantén el enfoque." };
    } else if (score < 10) {
      statusStyle = { bg: "bg-ios-green", msg: "Buen equilibrio." };
    }

    return {
      totalIncome,
      jarBalances,
      score,
      message: statusStyle.msg,
      colorClass: statusStyle.bg,
    };
  }, [transactions, userLevel]);

  const totalBalance = (Object.values(stats.jarBalances) as number[]).reduce(
    (a, b) => a + b,
    0,
  );
  const disponibleBalance = stats.jarBalances.general;

  const getLevelInfo = () => {
    switch (userLevel) {
      case UserLevel.HABITS:
        return {
          name: "Hábitos",
          color: "text-emerald-600",
          bg: "bg-emerald-50",
        };
      case UserLevel.ARCHITECT:
        return { name: "Progreso", color: "text-blue-600", bg: "bg-blue-50" };
      default:
        return { name: "Maestro", color: "text-amber-600", bg: "bg-amber-50" };
    }
  };

  const levelInfo = getLevelInfo();

  const chartData = useMemo(() => {
    const data = [
      { name: "Libertad", value: stats.jarBalances.clf, cat: Category.CLF },
      {
        name: "Ahorro",
        value: stats.jarBalances.savings,
        cat: Category.SAVINGS,
      },
      { name: "Ocio", value: stats.jarBalances.play, cat: Category.PLAY },
      { name: "Edu", value: stats.jarBalances.edu, cat: Category.EDUCATION },
      {
        name: "Gasto",
        value: stats.jarBalances.general,
        cat: Category.GENERAL,
      },
      { name: "Dona", value: stats.jarBalances.give, cat: Category.GIVE },
    ].filter((d) => d.value > 0);
    return data;
  }, [stats.jarBalances]);

  return (
    <div className="space-y-8 animate-ios-in">
      {/* Header Minimalista */}
      <div className="flex flex-col items-center pt-2">
        <div
          className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase mb-4 ${levelInfo.bg} ${levelInfo.color}`}
        >
          {levelInfo.name}
        </div>
        <p className="text-gray-500 text-[13px] font-medium mb-1">Disponible</p>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          ${disponibleBalance.toLocaleString()}
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-2">
          Patrimonio: ${totalBalance.toLocaleString()}
        </p>
      </div>

      {/* Tarjeta de Score Pro */}
      <div
        className={`p-5 rounded-ios-xl text-white shadow-sm flex items-center justify-between ${stats.colorClass}`}
      >
        <div className="space-y-0.5">
          <p className="text-[11px] font-semibold tracking-wider uppercase opacity-80">
            Score Financiero
          </p>
          <p className="text-lg font-bold">{stats.message}</p>
        </div>
        <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center">
          <span className="text-2xl font-bold">{stats.score}</span>
        </div>
      </div>

      {/* Gráfico y Distribución */}
      <div className="ios-card p-6">
        <h3 className="text-[17px] font-semibold mb-6">Distribución Actual</h3>
        <div className="h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[entry.cat] || "#E5E5EA"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[item.cat] }}
              />
              <div>
                <p className="text-[13px] text-gray-500 font-medium">
                  {item.name}
                </p>
                <p className="text-base font-semibold">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movimientos Recientes */}
      <div className="space-y-4">
        <h3 className="text-[17px] font-semibold px-1">Movimientos</h3>
        <div className="ios-card divide-y divide-gray-100 overflow-hidden">
          {transactions.length > 0 ? (
            transactions
              .slice()
              .reverse()
              .map((t) => (
                <div
                  key={t.id}
                  className="p-4 flex justify-between items-center active:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold text-slate-900 truncate">
                      {t.concept}
                    </p>
                    <p className="text-[12px] text-gray-400 font-medium">
                      {t.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-[16px] font-semibold ${t.type === TransactionType.INCOME ? "text-ios-green" : "text-slate-900"}`}
                    >
                      {t.type === TransactionType.INCOME ? "+" : "-"}$
                      {t.amount.toLocaleString()}
                    </p>
                    <button
                      onClick={() => onDelete?.(t.id)}
                      className="text-[11px] text-ios-red font-semibold uppercase tracking-wide mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="p-12 text-center text-gray-400 text-sm font-medium">
              No hay registros
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          if (showConfirm) {
            onClearAll?.();
            setShowConfirm(false);
          } else {
            setShowConfirm(true);
          }
        }}
        className={`w-full py-4 text-[13px] font-semibold uppercase tracking-widest rounded-xl transition-all ${showConfirm ? "bg-ios-red text-white" : "text-ios-red"}`}
      >
        {showConfirm ? "Confirmar Reinicio" : "Reiniciar Aplicación"}
      </button>
    </div>
  );
};

export default Dashboard;
