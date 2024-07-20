export function currencyFormat(value: number): string {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ฿';
}
