export const MONTHS = [
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
];

export function getDaysInMonth(month: string) {
  switch (month) {
    case 'April':
    case 'June':
    case 'September':
    case 'November':
      return 30;
    case 'February':
      return 28;
    default:
      return 31;
  }
}
