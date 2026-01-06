
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, MetabolicData, Gender, NutritionPlan } from '../types.ts';
import { ACTIVITY_FACTORS, MACRO_SPLIT, CALORIES_PER_GRAM } from '../constants.ts';

export const calculateMetabolicData = (profile: UserProfile): MetabolicData => {
  const { weight, height, age, gender, activityLevel } = profile;
  
  // Mifflin-St Jeor Equation
  let tmb = (10 * weight) + (6.25 * height) - (5 * age);
  if (gender === Gender.MALE) {
    tmb += 5;
  } else {
    tmb -= 161;
  }

  const getd = tmb * ACTIVITY_FACTORS[activityLevel];
  
  // Safe Deficit: 22%
  const deficitPercentage = 0.22;
  let deficitKcal = getd * deficitPercentage;
  let targetKcal = getd - deficitKcal;

  // Safety Floors
  const safetyFloor = gender === Gender.FEMALE ? 1200 : 1500;
  if (targetKcal < safetyFloor) {
    targetKcal = safetyFloor;
    deficitKcal = getd - targetKcal;
  }

  // Macros Calculation
  const proteinGrams = (targetKcal * MACRO_SPLIT.PROTEIN) / CALORIES_PER_GRAM.PROTEIN;
  const carbsGrams = (targetKcal * MACRO_SPLIT.CARBS) / CALORIES_PER_GRAM.CARBS;
  const fatGrams = (targetKcal * MACRO_SPLIT.FAT) / CALORIES_PER_GRAM.FAT;

  return {
    tmb: Math.round(tmb),
    getd: Math.round(getd),
    deficitKcal: Math.round(deficitKcal),
    targetKcal: Math.round(targetKcal),
    macros: {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fat: Math.round(fatGrams),
    }
  };
};

export const generateNutritionPlan = async (profile: UserProfile, metabolic: MetabolicData): Promise<NutritionPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Você é um Nutricionista Digital de IA avançado e experiente.
    Gere um plano alimentar para um usuário com o seguinte perfil:
    - Idade: ${profile.age}
    - Sexo: ${profile.gender}
    - Peso Atual: ${profile.weight}kg
    - Meta: ${profile.goalWeight}kg
    - Restrições: ${profile.restrictions || 'Nenhuma'}
    - Calorias Alvo: ${metabolic.targetKcal} kcal
    - Macros Alvo: Proteína ${metabolic.macros.protein}g, Carboidratos ${metabolic.macros.carbs}g, Gorduras ${metabolic.macros.fat}g

    Crie um cardápio rico em nutrientes, focado na meta do usuário, respeitando as restrições.
    A resposta deve ser em formato JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mealPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                name: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["time", "name", "items"]
            }
          },
          extraTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          disclaimer: { type: Type.STRING }
        },
        required: ["mealPlan", "extraTips", "disclaimer"]
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("Resposta vazia da IA");
  const data = JSON.parse(text);
  
  return {
    metabolicSummary: metabolic,
    dailyGoals: `${metabolic.targetKcal} kcal | P: ${metabolic.macros.protein}g | C: ${metabolic.macros.carbs}g | G: ${metabolic.macros.fat}g`,
    mealPlan: data.mealPlan,
    extraTips: data.extraTips,
    disclaimer: data.disclaimer
  };
};
