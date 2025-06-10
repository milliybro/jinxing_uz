export default function generatePassword(): string {
  const length = 10
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let generatedPassword = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    generatedPassword += charset[randomIndex]
  }

  return generatedPassword
}
