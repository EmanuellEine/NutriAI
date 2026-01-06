
import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutProfile, WorkoutPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWorkoutPlan = async (profile: WorkoutProfile): Promise<WorkoutPlan> => {
  const prompt = `
    Você é um Personal Trainer de elite de IA.
    Gere um plano de treino detalhado para um usuário com o seguinte perfil:
    - Objetivo: ${profile.goal}
    - Nível: ${profile.level}
    - Frequência: ${profile.frequency} dias por semana
    - Local: ${profile.location}
    - Restrições/Lesões: ${profile.restrictions || 'Nenhuma'}

    Estruture o treino em dias (Dia 1, Dia 2, etc.) de acordo com a frequência.
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
          routine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayName: { type: Type.STRING },
                focus: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.STRING },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      notes: { type: Type.STRING }
                    },
                    required: ["name", "sets", "reps"]
                  }
                }
              },
              required: ["dayName", "focus", "exercises"]
            }
          },
          generalTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          disclaimer: { type: Type.STRING }
        },
        required: ["routine", "generalTips", "disclaimer"]
      },
    },
  });

  return JSON.parse(response.text);
};
