import { IUser } from '@/types'

interface AuthTokens {
  access: string
  refresh: string
}

interface AuthResponse {
  auth_tokens: AuthTokens
  user_data: IUser
}

type sthElse = unknown

export type { AuthResponse, AuthTokens, sthElse }
