import React, { useMemo, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Transaction, TransactionType, Category, UserLevel } from "../types";

interface DashboardProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
  onUpdate?: (updated: Transaction) => void;
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

const HomeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ChartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const GameIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h4M8 10v4M15 13a1 1 0 1 0 2 0 1 1 0 1 0-2 0ZM18 11a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const JAR_CONFIG = [
  {
    key: "general",
    category: Category.GENERAL,
    label: "Necesidades",
    icon: <HomeIcon />,
  },
  {
    key: "clf",
    category: Category.CLF,
    label: "Libertad",
    icon: <ChartIcon />,
  },
  {
    key: "savings",
    category: Category.SAVINGS,
    label: "Ahorro",
    icon: <ShieldIcon />,
  },
  {
    key: "edu",
    category: Category.EDUCATION,
    label: "Educación",
    icon: <BookIcon />,
  },
  { key: "play", category: Category.PLAY, label: "Juego", icon: <GameIcon /> },
  {
    key: "give",
    category: Category.GIVE,
    label: "Donación",
    icon: <HeartIcon />,
  },
];

const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  onDelete,
  onClearAll,
  userLevel,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    let timer: any;
    if (showConfirm) {
      timer = setTimeout(() => setShowConfirm(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showConfirm]);

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

    let statusClass =
      "bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 border-blue-400/30";
    let message =
      "¡Impecable! Tu disciplina financiera te llevará a la libertad.";

    if (score < 5) {
      statusClass =
        "bg-gradient-to-br from-red-600 via-red-500 to-orange-600 border-red-400/30";
      message =
        "Alerta: Estás gastando más de lo planificado o no estás distribuyendo tus ingresos";
    } else if (score < 7) {
      statusClass =
        "bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-500 border-orange-300/30";
      message = "Atención: Tus gastos podrían comprometer tus metas de ahorro.";
    } else if (score < 9) {
      statusClass =
        "bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 border-emerald-400/30";
      message = "Buen trabajo. Mantienes un equilibrio saludable.";
    }

    return {
      totalIncome,
      jarBalances,
      score,
      message,
      colorClass: statusClass,
    };
  }, [transactions, userLevel]);

  const totalBalance = (Object.values(stats.jarBalances) as number[]).reduce(
    (a, b) => a + b,
    0,
  );
  const disponibleBalance = stats.jarBalances.general;

  const isJarActive = (key: string) => {
    if (userLevel === UserLevel.MASTER) return true;
    if (userLevel === UserLevel.ARCHITECT)
      return ["general", "clf", "savings"].includes(key);
    if (userLevel === UserLevel.HABITS)
      return ["general", "savings"].includes(key);
    return false;
  };

  const chartData = useMemo(() => {
    return JAR_CONFIG.filter((jar) => isJarActive(jar.key))
      .map((jar) => ({
        name: jar.label,
        value: Math.max(0, (stats.jarBalances as any)[jar.key]),
        category: jar.category,
      }))
      .filter((d) => d.value > 0);
  }, [userLevel, stats.jarBalances]);

  const filteredTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [transactions]);

  const getLevelInfo = () => {
    switch (userLevel) {
      case UserLevel.HABITS:
        return {
          name: "Sembrador de Hábitos",
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22v-7" />
              <path d="M12 15c-3.5 0-6-2-6-6 0-4 3-7 6-7 3 0 6 3 6 7 0 4-2.5 6-6 6Z" />
            </svg>
          ),
        };
      case UserLevel.ARCHITECT:
        return {
          name: "Arquitecto de Progreso",
          color: "text-blue-600",
          bg: "bg-blue-50",
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
              <path d="M15 21V9" />
            </svg>
          ),
        };
      default:
        return {
          name: "Mente Maestra",
          color: "text-amber-600",
          bg: "bg-amber-50",
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7Z" />
              <path d="M5 20h14" />
            </svg>
          ),
        };
    }
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!showConfirm) {
      setShowConfirm(true);
    } else {
      setShowConfirm(false);
      if (onClearAll) onClearAll();
    }
  };

  const levelInfo = getLevelInfo();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Etiqueta de Nivel Minimalista */}
      <div className="flex justify-center -mb-2">
        <div
          className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm ${levelInfo.bg} ${levelInfo.color}`}
        >
          <div className="opacity-80">{levelInfo.icon}</div>
          <span className="text-[10px] font-black uppercase tracking-widest">
            {levelInfo.name}
          </span>
        </div>
      </div>

      <div className="text-center py-4">
        <p className="text-gray-400 font-black text-[9px] mb-1 uppercase tracking-[0.4em]">
          Disponible / Necesidades
        </p>
        <h1 className="text-5xl font-bold text-slate-900 tracking-tighter mb-4">
          ${disponibleBalance.toLocaleString()}
        </h1>

        <div className="inline-flex flex-col items-center px-6 py-2.5 bg-white/70 border border-gray-200 rounded-[24px] shadow-sm backdrop-blur-sm">
          <span className="text-xl font-black text-blue-600 tracking-tight">
            Patrimonio: ${totalBalance.toLocaleString()}
          </span>
        </div>
      </div>

      <div
        className={`ios-card overflow-hidden text-white relative shadow-2xl border transition-all duration-700 ${stats.colorClass}`}
      >
        <div className="p-6 flex items-center space-x-5 relative z-10">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl backdrop-blur-lg flex flex-col items-center justify-center border border-white/30 shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-80 mb-0.5">
                SCORE
              </span>
              <span className="text-3xl font-black leading-none">
                {stats.score}
              </span>
              <span className="text-[10px] font-bold opacity-60 mt-1">
                / 10
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-1.5 drop-shadow-sm opacity-80">
              Estado Financiero
            </h4>
            <p className="text-lg font-bold leading-tight italic drop-shadow-md">
              "{stats.message}"
            </p>
          </div>
        </div>
      </div>

      <div className="ios-card p-6">
        <h3 className="text-lg font-bold mb-4 text-slate-800">
          Distribución de Capital
        </h3>
        <div className="h-56">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[entry.category] || "#CCCCCC"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    fontWeight: "bold",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                  itemStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
              <p className="text-xs italic text-center px-4">
                Tus ahorros e inversiones aparecerán aquí
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {JAR_CONFIG.map((jar) => {
            const active = isJarActive(jar.key);
            const val = (stats.jarBalances as any)[jar.key] || 0;
            return (
              <div
                key={jar.key}
                className={`relative py-4 px-3 rounded-[24px] text-center border transition-all duration-500 ${
                  active
                    ? "bg-white border-gray-100 shadow-sm"
                    : "bg-gray-50 border-gray-100 opacity-30"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`transition-colors duration-500 ${active ? "text-blue-600" : "text-gray-300"}`}
                    style={{
                      color: active ? CATEGORY_COLORS[jar.category] : undefined,
                    }}
                  >
                    {jar.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p
                      className={`text-[9px] font-black uppercase tracking-tight transition-colors duration-500 ${active ? "text-slate-400" : "text-gray-300"}`}
                    >
                      {jar.label}
                    </p>
                    <p
                      className={`text-xl font-black tracking-tighter transition-colors duration-500 ${active ? "text-slate-900" : "text-gray-200"}`}
                    >
                      ${active ? val.toLocaleString() : "---"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold text-slate-800">
            Movimientos Recientes
          </h3>
        </div>

        <div className="ios-card overflow-hidden">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  className="group p-5 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 min-w-0">
                      <div
                        className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${t.type === TransactionType.INCOME ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                      >
                        {t.type === TransactionType.INCOME ? "↑" : "↓"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg font-black text-slate-900 truncate tracking-tight">
                          {t.concept}
                        </p>
                        <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">
                          {t.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className={`text-xl font-black ${t.type === TransactionType.INCOME ? "text-green-600" : "text-slate-900"}`}
                      >
                        {t.type === TransactionType.INCOME ? "+" : "-"}$
                        {t.amount.toLocaleString()}
                      </div>
                      <div className="flex space-x-3 justify-end mt-1">
                        <button
                          onClick={() => onDelete?.(t.id)}
                          className="text-red-400 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors"
                        >
                          ELIMINAR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-gray-300 italic font-medium">
              Sin movimientos todavía
            </div>
          )}
        </div>

        <button
          onClick={handleAction}
          className={`w-full mt-4 py-4 px-6 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transition-all duration-300 active:scale-[0.98] ${
            showConfirm
              ? "bg-red-600 text-white animate-pulse"
              : "bg-red-50/50 border border-red-100 text-red-500 hover:bg-red-50"
          }`}
        >
          {showConfirm
            ? "¿ESTÁS SEGURO? TOCAR DE NUEVO"
            : "Eliminar todos los datos"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
