
import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel } from '../types';

interface NutritionFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const NutritionForm: React.FC<NutritionFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    gender: Gender.FEMALE,
    weight: 70,
    height: 165,
    activityLevel: ActivityLevel.MODERATE,
    goalWeight: 60,
    restrictions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' || name === 'goalWeight' ? Number(value) : value
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
          <label className={labelClass}>Idade</label>
          <input type="number" name="age" value={profile.age} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Sexo</label>
          <select name="gender" value={profile.gender} onChange={handleChange} className={inputClass}>
            {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Peso Atual (kg)</label>
          <input type="number" name="weight" value={profile.weight} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Altura (cm)</label>
          <input type="number" name="height" value={profile.height} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Nível de Atividade</label>
          <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className={inputClass}>
            {Object.values(ActivityLevel).map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Meta de Peso (kg)</label>
          <input type="number" name="goalWeight" value={profile.goalWeight} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
      </div>
      <div>
        <label className={labelClass}>Restrições Alimentares / Alergias</label>
        <textarea 
          name="restrictions" value={profile.restrictions} onChange={handleChange}
          placeholder="Ex: Sem glúten, vegetariano..."
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
        ) : 'Gerar Meu Plano'}
      </button>
    </form>
  );
};

export default NutritionForm;
