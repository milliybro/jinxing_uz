export function getDayDifference(date1?: string, date2?: string) {
  // Parse the input strings into Date objects
  if (!date1 || !date2) return
  const parsedDate1 = new Date(date1)
  const parsedDate2 = new Date(date2)

  // Validate the parsed dates
  if (isNaN(parsedDate1.getTime()) || isNaN(parsedDate2.getTime())) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.")
  }

  // Calculate the difference in time (in milliseconds)
  const differenceInTime = Math.abs(
    parsedDate1.getTime() - parsedDate2.getTime(),
  )

  // Convert the difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

  return differenceInDays
}
