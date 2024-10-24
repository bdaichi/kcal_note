export type Food = {
  id: string;
  name: string;
  image: string;
  kcal: number;
  baseUnit: BaseUnit;
  quantity: Quantity;
  protein: number;
  carb: number;
  fat: number;
  category: FoodCategory;
  note?: string;
  creatorID: string;
};

export type BaseUnit = "g" | "single";

export type Quantity = 100 | 1;

export type FoodCategory =
  | "carb"
  | "meat"
  | "fish"
  | "vegetable"
  | "fruit"
  | "dairy"
  | "seasoning"
  | "customize"
  | "other";
