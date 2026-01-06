
import React from 'react';
import { WorkoutPlan } from '../types';

interface WorkoutDisplayProps {
  plan: WorkoutPlan;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 gap-6">
        {plan.routine.map((day, idx) => (
          <div key={idx} className="bg-white rounded-[32px] shadow-sm border border-zinc-100 overflow-hidden">
            <div className="p-6 border-b border-zinc-50 bg-zinc-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">{day.dayName}</h3>
                <p className="text-lg font-black uppercase tracking-widest">{day.focus}</p>
              </div>
              <div className="bg-white/10 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border border-white/5">
                {day.exercises.length} Exercícios
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50/30 border-b border-zinc-50">
                    <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">Exercício</th>
                    <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest text-center">Séries</th>
                    <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest text-center">Reps</th>
                    <th className="px-6 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest text-right">Pausa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {day.exercises.map((ex, i) => (
                    <tr key={i} className="hover:bg-zinc-50/20 transition-all">
                      <td className="px-6 py-5">
                        <div className="text-[14px] font-black text-zinc-900 mb-1 tracking-tight">{ex.name}</div>
                        {ex.notes && <div className="text-[11px] text-zinc-400 italic font-medium leading-snug">{ex.notes}</div>}
                      </td>
                      <td className="px-6 py-5 text-center text-[14px] font-bold text-zinc-600">{ex.sets}</td>
                      <td className="px-6 py-5 text-center text-[14px] font-bold text-zinc-600">{ex.reps}</td>
                      <td className="px-6 py-5 text-right text-[12px] font-black text-zinc-400 uppercase tracking-tighter">{ex.rest || '60s'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-50 p-8 rounded-[32px] border border-zinc-100">
          <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-500">Execução</h3>
          <ul className="space-y-4">
            {plan.generalTips.map((tip, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="w-5 h-5 bg-zinc-900 text-white rounded-lg flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5">{idx + 1}</span>
                <p className="text-[13px] text-zinc-600 leading-relaxed font-semibold">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-zinc-100 flex flex-col justify-center text-center">
          <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Segurança</h3>
          <p className="text-[13px] text-zinc-400 leading-relaxed italic font-bold">
            "{plan.disclaimer}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
