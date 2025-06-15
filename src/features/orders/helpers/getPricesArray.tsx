import dayjs from 'dayjs'

// Accepts start and end date, price, and returns an array of objects for the table content
export function getPricesArray(price?: number, start?: string, end?: string) {
  if (!start || !end) return
  const date1 = dayjs(start)
  const date2 = dayjs(end)
  const days = date2.diff(date1, 'day')
  const pricesArray = []

  for (let i = 0; i < days; i++) {
    pricesArray.push({
      date: date1.add(i, 'day').format('DD.MM.YYYY'),
      price: price,
    })
  }

  return pricesArray
}
