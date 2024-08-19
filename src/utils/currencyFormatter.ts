export const formatCurrency = (value: number): string => {
  if (Number.isNaN(value)) return '0원';
  return `${value.toLocaleString('ko-KR')}원`;
};
