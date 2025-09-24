import { z } from "zod";

// Core numerology reading schema
export const numerologyReadingSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Full name is required"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  lifePathNumber: z.number().min(1).max(33),
  destinyNumber: z.number().min(1).max(33),
  soulUrgeNumber: z.number().min(1).max(33),
  personalityNumber: z.number().min(1).max(33),
  birthdayNumber: z.number().min(1).max(31),
  attitudeNumber: z.number().min(1).max(33),
  karmicDebtNumbers: z.array(z.number()),
  masterNumbers: z.array(z.number()),
  interpretation: z.record(z.string()),
  timestamp: z.number(),
});

export const insertNumerologyReadingSchema = numerologyReadingSchema.omit({
  id: true,
  timestamp: true,
});

export type NumerologyReading = z.infer<typeof numerologyReadingSchema>;
export type InsertNumerologyReading = z.infer<typeof insertNumerologyReadingSchema>;

// Compatibility test schema
export const compatibilityTestSchema = z.object({
  id: z.string(),
  person1Name: z.string().min(1, "Person 1 name is required"),
  person1BirthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  person2Name: z.string().min(1, "Person 2 name is required"),
  person2BirthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  testType: z.enum(["lifePath", "name", "complete"]),
  compatibilityScore: z.number().min(0).max(100),
  person1Numbers: z.record(z.number()),
  person2Numbers: z.record(z.number()),
  interpretation: z.string(),
  timestamp: z.number(),
});

export const insertCompatibilityTestSchema = compatibilityTestSchema.omit({
  id: true,
  timestamp: true,
});

export type CompatibilityTest = z.infer<typeof compatibilityTestSchema>;
export type InsertCompatibilityTest = z.infer<typeof insertCompatibilityTestSchema>;

// User preference schema for language and saved data
export const userPreferencesSchema = z.object({
  language: z.enum(["en", "ru", "cs"]).default("en"),
  savedReadings: z.array(numerologyReadingSchema).default([]),
  savedCompatibilityTests: z.array(compatibilityTestSchema).default([]),
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;
