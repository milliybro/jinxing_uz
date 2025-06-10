export function formatPrice(price: number | string): string {
  if (!price) return '0 UZS'
  const num = typeof price === 'string' ? parseInt(price, 10) : price
  return ''+ num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' USD'
}
