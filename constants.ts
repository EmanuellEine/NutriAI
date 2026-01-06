
import { ActivityLevel } from './types';

export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.INTENSE]: 1.725,
};

export const MACRO_SPLIT = {
  PROTEIN: 0.30, // 30%
  CARBS: 0.40,   // 40%
  FAT: 0.30,     // 30%
};

export const CALORIES_PER_GRAM = {
  PROTEIN: 4,
  CARBS: 4,
  FAT: 9,
};
