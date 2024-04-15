export function currencyFormatter(value: string, currency: string, minimumFractionDigits = 6) {
  return Number(value).toLocaleString('pt-br', {
    currency,
    minimumFractionDigits,
  });
}
