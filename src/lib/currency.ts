export function formatCurrency({ amount, currency }) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount)
}
