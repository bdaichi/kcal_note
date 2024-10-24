export const validateNumberInput = (value: string): number => {
  if (value == "") {
    return 0;
  }
  if (value.match(/^[0-9]+$/) != null) {
    return Number(value);
  } else {
    return 0;
  }
};

export const formatDateString = (dateString: string): string => {
  // 8桁の日付文字列が正しいかチェック
  if (!/^\d{8}$/.test(dateString)) {
    return "";
  }

  const year = dateString.substring(0, 4);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);

  return `${year}年${month}月${day}日`;
};
