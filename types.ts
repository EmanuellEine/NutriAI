
export enum ActivityLevel {
  SEDENTARY = 'Sedentário',
  LIGHT = 'Leve',
  MODERATE = 'Moderado',
  INTENSE = 'Intenso'
}

export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Feminino'
}

export interface UserProfile {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goalWeight: number;
  restrictions: string;
}

export interface MetabolicData {
  tmb: number;
  getd: number;
  deficitKcal: number;
  targetKcal: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Meal {
  time: string;
  name: string;
  items: string[];
}

export interface NutritionPlan {
  metabolicSummary: MetabolicData;
  dailyGoals: string;
  mealPlan: Meal[];
  extraTips: string[];
  disclaimer: string;
}

// Workout Types
export interface WorkoutProfile {
  goal: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  frequency: number;
  location: 'Academia' | 'Casa';
  restrictions: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  routine: WorkoutDay[];
  generalTips: string[];
  disclaimer: string;
}
