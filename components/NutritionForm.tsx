
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

  const inputClass = "w-full px-4 py-3 bg-zinc-50/50 rounded-xl border border-zinc-200/60 focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 outline-none transition-all text-sm font-semibold text-zinc-800 placeholder:text-zinc-300";
  const labelClass = "text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-zinc-100 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className={labelClass}>Idade</label>
          <input type="number" name="age" value={profile.age} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="col-span-1">
          <label className={labelClass}>Sexo</label>
          <select name="gender" value={profile.gender} onChange={handleChange} className={inputClass}>
            {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="col-span-1">
          <label className={labelClass}>Peso (kg)</label>
          <input type="number" name="weight" value={profile.weight} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="col-span-1">
          <label className={labelClass}>Altura (cm)</label>
          <input type="number" name="height" value={profile.height} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Atividade</label>
          <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className={inputClass}>
            {Object.values(ActivityLevel).map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Meta (kg)</label>
          <input type="number" name="goalWeight" value={profile.goalWeight} onFocus={handleFocus} onChange={handleChange} className={inputClass} required />
        </div>
      </div>
      <div>
        <label className={labelClass}>Restrições</label>
        <textarea 
          name="restrictions" value={profile.restrictions} onChange={handleChange}
          placeholder="Ex: Sem glúten..."
          className={`${inputClass} h-20 resize-none py-3`}
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-[0.3em] py-4 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        ) : 'Gerar Protocolo'}
      </button>
    </form>
  );
};

export default NutritionForm;
