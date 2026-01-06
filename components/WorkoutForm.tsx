
import React, { useState } from 'react';
import { WorkoutProfile } from '../types';

interface WorkoutFormProps {
  onSubmit: (profile: WorkoutProfile) => void;
  isLoading: boolean;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<WorkoutProfile>({
    goal: 'Hipertrofia',
    level: 'Intermediário',
    frequency: 4,
    location: 'Academia',
    restrictions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'frequency' ? Number(value) : value
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const inputClass = "w-full px-4 py-3 bg-zinc-50/50 rounded-xl border border-zinc-200/60 focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all text-sm font-semibold text-zinc-800 placeholder:text-zinc-300";
  const labelClass = "text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-zinc-100 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className={labelClass}>Objetivo Principal</label>
          <select name="goal" value={profile.goal} onChange={handleChange} className={inputClass}>
            <option>Hipertrofia</option>
            <option>Emagrecimento</option>
            <option>Resistência</option>
            <option>Condicionamento</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className={labelClass}>Nível</label>
          <select name="level" value={profile.level} onChange={handleChange} className={inputClass}>
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className={labelClass}>Frequência (Dias/Semana)</label>
          <input type="number" name="frequency" value={profile.frequency} onFocus={handleFocus} onChange={handleChange} className={inputClass} min="1" max="7" required />
        </div>
        <div className="col-span-1">
          <label className={labelClass}>Local do Treino</label>
          <select name="location" value={profile.location} onChange={handleChange} className={inputClass}>
            <option>Academia</option>
            <option>Casa</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Lesões ou Limitações</label>
        <textarea 
          name="restrictions" value={profile.restrictions} onChange={handleChange}
          placeholder="Ex: Dor no joelho, hérnia..."
          className={`${inputClass} h-24 resize-none py-3`}
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-[0.3em] py-4 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-zinc-100"
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        ) : 'Gerar Protocolo'}
      </button>
    </form>
  );
};

export default WorkoutForm;
