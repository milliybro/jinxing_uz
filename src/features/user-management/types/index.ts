interface IUser {
  id: number
  username: string
  first_name: string
  last_name: string
  avatar: string
  email: string
  phone: any
  birth_date: any
  gender: string
  type: string
  password_changed: boolean
  branch_user: BranchUser
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  groups: Group[]
  user_permissions: any[]
  date_joined: string
  last_login: string
  created_at: string
  updated_at: string
  deleted: any
  deleted_by_cascade: boolean
}

interface BranchUser {
  branch: number
  user: number
}

interface Group {
  name: any
  description: any
  key: any
}

interface IRole {
  id: number
  name: string
  description: string
  key: string
  status: boolean
}

export type { IUser, IRole }
