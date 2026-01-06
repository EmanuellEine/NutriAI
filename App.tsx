
import React, { useState, useCallback } from 'react';
import Header from './components/Header.tsx';
import NutritionForm from './components/NutritionForm.tsx';
import PlanDisplay from './components/PlanDisplay.tsx';
import WorkoutForm from './components/WorkoutForm.tsx';
import WorkoutDisplay from './components/WorkoutDisplay.tsx';
import { UserProfile, NutritionPlan, WorkoutProfile, WorkoutPlan } from './types.ts';
import { calculateMetabolicData, generateNutritionPlan } from './services/nutritionService.ts';
import { generateWorkoutPlan } from './services/workoutService.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nutrition' | 'workout'>('nutrition');
  const [isLoading, setIsLoading] = useState(false);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNutritionSubmit = useCallback(async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const metabolic = calculateMetabolicData(profile);
      const generatedPlan = await generateNutritionPlan(profile, metabolic);
      setNutritionPlan(generatedPlan);
      setWorkoutPlan(null); // Limpa o outro plano para economizar memória
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Erro Nutrição:", err);
      setError("Falha ao gerar plano de nutrição. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleWorkoutSubmit = useCallback(async (profile: WorkoutProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedWorkout = await generateWorkoutPlan(profile);
      setWorkoutPlan(generatedWorkout);
      setNutritionPlan(null); // Limpa o outro plano para economizar memória
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Erro Treino:", err);
      setError("Falha ao gerar plano de treino.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setError(null);
      }} />
      
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-100 border border-zinc-200 rounded-2xl mb-8">
                <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse"></span>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  {activeTab === 'nutrition' ? 'AI-Nutrition System' : 'AI-Workout System'}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-zinc-900 leading-[1.1] tracking-tighter mb-8">
                {activeTab === 'nutrition' ? (
                  <>Sua dieta, <br/><span className="text-zinc-300 italic">inteligente.</span></>
                ) : (
                  <>Sua rotina, <br/><span className="text-zinc-300 italic">otimizada.</span></>
                )}
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-sm font-medium">
                Desenvolvemos estratégias de alta performance adaptadas ao seu DNA metabólico.
              </p>
            </div>

            {activeTab === 'nutrition' ? (
              <NutritionForm onSubmit={handleNutritionSubmit} isLoading={isLoading} />
            ) : (
              <WorkoutForm onSubmit={handleWorkoutSubmit} isLoading={isLoading} />
            )}
            
            {error && (
              <div className="mt-8 bg-zinc-900 text-white p-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-4 animate-bounce">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                {error}
              </div>
            )}
          </div>

          <div id="results-view" className="lg:col-span-7 pt-12 lg:pt-0">
            {isLoading ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-zinc-50 rounded-[64px] border border-zinc-100">
                <div className="w-20 h-20 border-[3px] border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-10"></div>
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-[0.4em] mb-4">Processando</h3>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em]">Gerando inteligência aplicada...</p>
              </div>
            ) : (
              <div className="h-full">
                {activeTab === 'nutrition' && nutritionPlan && <PlanDisplay plan={nutritionPlan} />}
                {activeTab === 'workout' && workoutPlan && <WorkoutDisplay plan={workoutPlan} />}
                
                {((activeTab === 'nutrition' && !nutritionPlan) || (activeTab === 'workout' && !workoutPlan)) && (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-zinc-50 rounded-[64px] border border-zinc-100 shadow-inner">
                    <div className="w-20 h-20 bg-white rounded-[32px] shadow-sm flex items-center justify-center mb-10 border border-zinc-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] mb-4">Aguardando Input</h3>
                    <p className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.25em]">Preencha o formulário para começar</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-32 border-t border-zinc-100 py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">
            © 2024 NutriAI Expert • High-Performance Systems
          </div>
          <div className="flex gap-12 text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">
            <span>v2.0.4-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
