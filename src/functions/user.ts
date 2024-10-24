import { DietMethod, Gender, TrainingLevel, UserStatus } from "@/types/user";

export const convertToTrainingLevel = (level: TrainingLevel) => {
  switch (level) {
    case "one":
      return "ほぼ運動しない。通勤、デスクワーク程度";
    case "two":
      return "軽い運動。週に1回〜2回程度の運動";
    case "three":
      return "中程度の運動。週に3回〜5回程度の運動";
    case "four":
      return "激しい運動。6回〜7回程度の運動";
    case "five":
      return "非常に激しい。1日に2回以上の運動";
  }
};

export const convertToGender = (gender: Gender) => {
  switch (gender) {
    case "man":
      return "男性";
    case "woman":
      return "女性";
    case "other":
      return "その他";
  }
};

export const convertToUserStatus = (status: UserStatus) => {
  switch (status) {
    case "diet":
      return "ダイエット";
    case "maintain":
      return "維持";
    case "bulkUp":
      return "増量";
  }
};

export const convertToDietMethod = (dietMethod: DietMethod) => {
  switch (dietMethod) {
    case "lowFat":
      return "ローファット(脂質制限)";
    case "lowCarb":
      return "ケトジェニック(糖質制限)";
  }
};

//トレーニングレベルによる消費カロリーの倍率を返す関数
export const trainingLevelMultiplier = (trainingLevel: TrainingLevel) => {
  switch (trainingLevel) {
    case "one":
      return 1.2;
    case "two":
      return 1.375;
    case "three":
      return 1.55;
    case "four":
      return 1.725;
    case "five":
      return 1.9;
  }
};

//基礎代謝量を計算する関数 参考:https://keisan.casio.jp/exec/system/1567491116
export const BMR = (
  weight: number,
  stature: number,
  age: number,
  gender: Gender
) => {
  switch (gender) {
    case "man":
      return Math.round(
        13.397 * weight + 4.799 * stature - 5.677 * age + 88.362
      );
    case "woman":
      return Math.round(
        9.247 * weight + 3.098 * stature - 4.33 * age + 447.593
      );
    case "other":
      return 0;
  }
};

//消費カロリーを計算する関数
export const calculateCalorie = (
  weight: number,
  stature: number,
  age: number,
  trainingLevel: TrainingLevel,
  gender: Gender
) => {
  const calorie =
    BMR(weight, stature, age, gender) * trainingLevelMultiplier(trainingLevel);
  return Math.round(calorie);
};

export const calculateCarb = (
  calorie: number,
  userStatus: UserStatus,
  dietMethod: DietMethod
) => {
  if (userStatus === "maintain" || userStatus === "bulkUp") {
    return Math.round((calorie * 0.55) / 4);
  }
  switch (dietMethod) {
    case "lowFat":
      return Math.round((calorie * 0.6) / 4);
    case "lowCarb":
      return Math.round((calorie * 0.1) / 4);
  }
};

export const calculateProtein = (weight: number, gender: Gender) => {
  switch (gender) {
    case "man":
      return weight * 2;
    case "woman":
      return weight * 1.5;
    case "other":
      return 0;
  }
};

export const calculateFat = (
  calorie: number,
  userStatus: UserStatus,
  dietMethod: DietMethod
) => {
  if (userStatus === "maintain" || userStatus === "bulkUp") {
    return Math.round((calorie * 0.25) / 9);
  }
  switch (dietMethod) {
    case "lowFat":
      return Math.round((calorie * 0.15) / 9);
    case "lowCarb":
      return Math.round((calorie * 0.7) / 9);
  }
};
