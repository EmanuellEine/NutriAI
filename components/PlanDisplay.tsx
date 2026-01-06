
import React from 'react';
import { NutritionPlan } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PlanDisplayProps {
  plan: NutritionPlan;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  const macroData = [
    { name: 'Proteína', value: plan.metabolicSummary.macros.protein * 4, color: '#09090b', grams: plan.metabolicSummary.macros.protein }, 
    { name: 'Carbo', value: plan.metabolicSummary.macros.carbs * 4, color: '#71717a', grams: plan.metabolicSummary.macros.carbs }, 
    { name: 'Gordura', value: plan.metabolicSummary.macros.fat * 9, color: '#d4d4d8', grams: plan.metabolicSummary.macros.fat }, 
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Metabolic Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'TMB', val: plan.metabolicSummary.tmb, unit: 'kcal' },
          { label: 'Gasto Total', val: plan.metabolicSummary.getd, unit: 'kcal' },
          { label: 'Meta Diária', val: plan.metabolicSummary.targetKcal, unit: 'kcal', dark: true },
          { label: 'Déficit', val: plan.metabolicSummary.deficitKcal, unit: 'kcal' },
        ].map((item, idx) => (
          <div key={idx} className={`${item.dark ? 'bg-zinc-900 text-white shadow-2xl shadow-zinc-200' : 'bg-white text-zinc-900'} p-6 md:p-8 rounded-[32px] border border-zinc-100 transition-transform hover:scale-[1.02]`}>
            <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${item.dark ? 'text-zinc-500' : 'text-zinc-400'} mb-3`}>{item.label}</p>
            <p className="text-2xl md:text-3xl font-black">{item.val}<span className="text-[12px] font-bold opacity-40 ml-1.5 uppercase tracking-tighter">{item.unit}</span></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Macros Column */}
        <div className="lg:col-span-5 bg-white p-10 rounded-[48px] shadow-sm border border-zinc-100 flex flex-col items-center">
          <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em] mb-10 text-center">Distribuição de Macros</h3>
          
          <div className="relative w-full aspect-square max-w-[220px] mb-10 flex items-center justify-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    innerRadius="70%"
                    outerRadius="95%"
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={450}
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', fontSize: '13px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-black text-zinc-300 uppercase tracking-widest">Total Kcal</span>
              <span className="text-2xl font-black text-zinc-900 tracking-tighter">{plan.metabolicSummary.targetKcal}</span>
            </div>
          </div>

          <div className="space-y-6 w-full">
            {macroData.map((m, i) => (
              <div key={i} className="flex items-center justify-between group px-2">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }}></div>
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] group-hover:text-zinc-900 transition-colors">{m.name}</span>
                </div>
                <span className="text-[15px] font-black text-zinc-900">{m.grams}g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Plan Table */}
        <div className="lg:col-span-7 bg-white rounded-[48px] shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-8 border-b border-zinc-50 bg-zinc-50/20">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em]">Protocolo Alimentar</h3>
          </div>
          <div className="divide-y divide-zinc-50">
            {plan.mealPlan.map((meal, idx) => (
              <div key={idx} className="flex flex-col md:flex-row p-8 hover:bg-zinc-50/50 transition-all gap-5 md:gap-0">
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.2em]">{meal.time}</span>
                </div>
                <div className="flex-grow">
                  <div className="text-[16px] font-black text-zinc-900 mb-4 tracking-tight">{meal.name}</div>
                  <div className="flex flex-wrap gap-3">
                    {meal.items.map((item, i) => (
                      <span key={i} className="text-[12px] font-bold bg-zinc-100 text-zinc-700 px-4 py-2 rounded-2xl border border-zinc-200/50">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra Tips & Disclaimer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-10 rounded-[48px] text-white shadow-2xl shadow-zinc-100">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-500">Dicas de Performance</h3>
          <ul className="space-y-6">
            {plan.extraTips.map((tip, idx) => (
              <li key={idx} className="flex gap-5 items-start">
                <span className="text-[11px] font-black text-zinc-700 mt-1">{String(idx + 1).padStart(2, '0')}</span>
                <p className="text-[14px] text-zinc-300 leading-relaxed font-semibold">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-10 rounded-[48px] border border-zinc-100 flex flex-col">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">Informações Legais</h3>
          <p className="text-[13px] text-zinc-500 leading-relaxed mb-10 font-medium italic">
            "{plan.disclaimer}"
          </p>
          <div className="mt-auto p-6 bg-zinc-50 rounded-3xl text-[11px] text-zinc-400 font-black uppercase tracking-[0.25em] text-center border border-zinc-100">
            Acompanhamento profissional é essencial.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;
