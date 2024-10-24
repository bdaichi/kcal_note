import { BaseUnit } from "@/types/food";

export const convertToBaseUnit = (baseUnit: BaseUnit) => {
  if (baseUnit === "g") {
    return baseUnit;
  }
  return "個";
};
