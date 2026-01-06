
import React from 'react';
import { WorkoutPlan } from '../types';

interface WorkoutDisplayProps {
  plan: WorkoutPlan;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 gap-10">
        {plan.routine.map((day, idx) => (
          <div key={idx} className="bg-white rounded-[48px] shadow-sm border border-zinc-100 overflow-hidden">
            <div className="p-8 border-b border-zinc-50 bg-zinc-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">{day.dayName}</h3>
                <p className="text-xl font-black uppercase tracking-widest">{day.focus}</p>
              </div>
              <div className="bg-white/10 px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border border-white/5">
                {day.exercises.length} Exercícios
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50/50 border-b border-zinc-50">
                    <th className="px-8 py-5 text-[11px] font-black text-zinc-400 uppercase tracking-widest">Exercício</th>
                    <th className="px-8 py-5 text-[11px] font-black text-zinc-400 uppercase tracking-widest text-center">Séries</th>
                    <th className="px-8 py-5 text-[11px] font-black text-zinc-400 uppercase tracking-widest text-center">Reps</th>
                    <th className="px-8 py-5 text-[11px] font-black text-zinc-400 uppercase tracking-widest text-right">Descanso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {day.exercises.map((ex, i) => (
                    <tr key={i} className="hover:bg-zinc-50/30 transition-all">
                      <td className="px-8 py-6">
                        <div className="text-[15px] font-black text-zinc-900 mb-2 tracking-tight">{ex.name}</div>
                        {ex.notes && <div className="text-[12px] text-zinc-400 italic font-medium leading-snug">{ex.notes}</div>}
                      </td>
                      <td className="px-8 py-6 text-center text-[15px] font-bold text-zinc-600">{ex.sets}</td>
                      <td className="px-8 py-6 text-center text-[15px] font-bold text-zinc-600">{ex.reps}</td>
                      <td className="px-8 py-6 text-right text-[13px] font-black text-zinc-400 uppercase tracking-tighter">{ex.rest || '60s'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-100 p-10 rounded-[48px] border border-zinc-200">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-500">Instruções de Execução</h3>
          <ul className="space-y-6">
            {plan.generalTips.map((tip, idx) => (
              <li key={idx} className="flex gap-5 items-start">
                <span className="w-6 h-6 bg-zinc-900 text-white rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 mt-0.5">{idx + 1}</span>
                <p className="text-[14px] text-zinc-600 leading-relaxed font-bold">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-10 rounded-[48px] border border-zinc-100 flex flex-col justify-center text-center">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-5">Segurança</h3>
          <p className="text-[14px] text-zinc-500 leading-relaxed italic font-bold">
            "{plan.disclaimer}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
