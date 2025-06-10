interface AuthResponse {
  access: string
  refresh: string
}

interface Permission {
  id: number
  name: string
  codename: boolean
}

interface UserPermissions {
  id: number
  app_label: string
  model: string
  permissions: Permission[]
}

interface RolePermissions {
  description: string
  id: number
  key: string | null
  name: string
  permissions: Permission[]
  status: true
}

interface IUserRole {
  id: number
  name: string
  description: string
  key: string | null
  status: boolean
}

export type {
  AuthResponse,
  Permission,
  UserPermissions,
  RolePermissions,
  IUserRole,
}
