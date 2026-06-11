import { z } from "zod";

export const bmiSchema = z.object({
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
});

export const bmrSchema = z.object({
  age: z.number().min(10).max(120),
  gender: z.enum(["male", "female"]),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
});

export const tdeeSchema = bmrSchema.extend({
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active", "extra_active"]),
});

export const proteinSchema = z.object({
  weight: z.number().min(20).max(500),
  goal: z.enum(["fat_loss", "maintenance", "muscle_gain"]),
});

export const waterSchema = z.object({
  weight: z.number().min(20).max(500),
  activityLevel: z.enum(["sedentary", "moderate", "active", "very_active"]),
  weather: z.enum(["cold", "moderate", "hot", "very_hot"]),
});

export const bodyFatSchema = z.object({
  gender: z.enum(["male", "female"]),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
  waist: z.number().min(30).max(200),
  neck: z.number().min(20).max(100),
  hip: z.number().min(30).max(200).optional(),
}).refine((data) => {
  if (data.gender === "female" && !data.hip) {
    return false;
  }
  return true;
}, {
  message: "Hip measurement is required for females",
  path: ["hip"],
});

export const macroSchema = tdeeSchema.extend({
  goal: z.enum(["fat_loss", "maintenance", "muscle_gain"]),
});

export const caloriesBurnedSchema = z.object({
  activity: z.enum(["running", "walking", "cycling", "swimming", "skipping", "gym"]),
  duration: z.number().min(5).max(600), // in minutes
  weight: z.number().min(20).max(500),
});

export const oneRepMaxSchema = z.object({
  weightLifted: z.number().min(1).max(1000),
  repetitions: z.number().min(1).max(30),
});

export const weightLossTimelineSchema = z.object({
  currentWeight: z.number().min(30).max(500),
  targetWeight: z.number().min(30).max(500),
  calorieDeficit: z.number().min(100).max(2000),
}).refine((data) => data.targetWeight < data.currentWeight, {
  message: "Target weight must be less than current weight",
  path: ["targetWeight"],
});

// Type Exports
export type BmiInput = z.infer<typeof bmiSchema>;
export type BmrInput = z.infer<typeof bmrSchema>;
export type TdeeInput = z.infer<typeof tdeeSchema>;
export type ProteinInput = z.infer<typeof proteinSchema>;
export type WaterInput = z.infer<typeof waterSchema>;
export type BodyFatInput = z.infer<typeof bodyFatSchema>;
export type MacroInput = z.infer<typeof macroSchema>;
export type CaloriesBurnedInput = z.infer<typeof caloriesBurnedSchema>;
export type OneRepMaxInput = z.infer<typeof oneRepMaxSchema>;
export type WeightLossTimelineInput = z.infer<typeof weightLossTimelineSchema>;
