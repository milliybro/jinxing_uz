export function capitalizeFirstLetters(str: string): string {
  if (!str) return ''
  return str
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ')
}
