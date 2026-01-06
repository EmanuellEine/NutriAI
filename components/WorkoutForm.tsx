
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

  const inputClass = "w-full px-4 py-3.5 bg-white rounded-xl border border-zinc-200 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all text-[15px] placeholder:text-zinc-400 font-semibold text-zinc-800";
  const labelClass = "text-[11px] font-black text-zinc-400 uppercase tracking-[0.15em] mb-2 block";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-zinc-100 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label className={labelClass}>Objetivo Principal</label>
          <select name="goal" value={profile.goal} onChange={handleChange} className={inputClass}>
            <option>Hipertrofia</option>
            <option>Emagrecimento</option>
            <option>Resistência</option>
            <option>Condicionamento</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Nível</label>
          <select name="level" value={profile.level} onChange={handleChange} className={inputClass}>
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Frequência (Dias/Semana)</label>
          <input type="number" name="frequency" value={profile.frequency} onFocus={handleFocus} onChange={handleChange} className={inputClass} min="1" max="7" required />
        </div>
        <div>
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
          placeholder="Ex: Dor no joelho, hérnia de disco..."
          className={`${inputClass} h-32 resize-none py-4 leading-relaxed`}
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-[13px] font-black uppercase tracking-[0.3em] py-6 px-8 rounded-2xl transition-all shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        ) : 'Gerar Meu Treino'}
      </button>
    </form>
  );
};

export default WorkoutForm;
