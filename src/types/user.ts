export type User = {
  uid: string;
  name: string;
  email: string;
  stature: number;
  weight: number;
  age: number;
  gender: Gender;
  trainingLevel: TrainingLevel;
  status: UserStatus;
  dietMethod: DietMethod;
  targetWeight: number;
};

export type Gender = "man" | "woman" | "other";

export type TrainingLevel = "one" | "two" | "three" | "four" | "five";

export type UserStatus = "diet" | "maintain" | "bulkUp";

export type DietMethod = "lowFat" | "lowCarb";
