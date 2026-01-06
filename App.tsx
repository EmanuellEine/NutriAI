
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
      setWorkoutPlan(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError("Erro na conexão com o servidor de IA.");
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
      setNutritionPlan(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError("Falha ao processar rotina de treino.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setError(null);
      }} />
      
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-6 pt-24 pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* Coluna de Entrada: Títulos e Formulário */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100/80 border border-zinc-200/50 rounded-lg mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse"></span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  {activeTab === 'nutrition' ? 'Nutrition IQ' : 'Workout Engineering'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight tracking-tighter mb-4">
                {activeTab === 'nutrition' ? (
                  <>Nutrição <span className="text-zinc-300 italic font-medium">Precision.</span></>
                ) : (
                  <>Treino <span className="text-zinc-300 italic font-medium">Advanced.</span></>
                )}
              </h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                Sistemas inteligentes aplicados para otimização biológica e performance máxima.
              </p>
            </div>

            <div className="w-full">
              {activeTab === 'nutrition' ? (
                <NutritionForm onSubmit={handleNutritionSubmit} isLoading={isLoading} />
              ) : (
                <WorkoutForm onSubmit={handleWorkoutSubmit} isLoading={isLoading} />
              )}
            </div>
            
            {error && (
              <div className="mt-6 bg-zinc-900 text-white p-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {error}
              </div>
            )}
          </div>

          {/* Coluna de Resultados */}
          <div className="lg:col-span-7 w-full">
            <div className="min-h-[600px] w-full">
              {isLoading ? (
                <div className="h-[600px] bg-white rounded-[32px] border border-zinc-100 flex flex-col items-center justify-center p-12 text-center shadow-sm">
                  <div className="w-10 h-10 border-[2px] border-zinc-100 border-t-zinc-900 rounded-full animate-spin mb-6"></div>
                  <h3 className="text-[10px] font-black text-zinc-900 uppercase tracking-[0.4em] mb-2">Processando</h3>
                  <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-[0.2em]">Sincronizando modelos de IA...</p>
                </div>
              ) : (
                <div className="w-full h-full">
                  {activeTab === 'nutrition' && nutritionPlan && <PlanDisplay plan={nutritionPlan} />}
                  {activeTab === 'workout' && workoutPlan && <WorkoutDisplay plan={workoutPlan} />}
                  
                  {((activeTab === 'nutrition' && !nutritionPlan) || (activeTab === 'workout' && !workoutPlan)) && (
                    <div className="h-[600px] bg-white rounded-[32px] border border-zinc-100 flex flex-col items-center justify-center p-12 text-center shadow-sm">
                      <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-6 border border-zinc-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-2">Dashboard Offline</h3>
                      <p className="text-zinc-300 text-[9px] font-bold uppercase tracking-[0.2em]">Insira os parâmetros no painel lateral</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-zinc-100 py-8 px-6 bg-white/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">
            © 2025 NutriAI Expert • High-Performance Systems
          </div>
          <div className="flex gap-6 text-[9px] font-black text-zinc-300 uppercase tracking-[0.2em]">
            <span>v2.0.7 Stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
