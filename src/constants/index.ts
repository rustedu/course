import { EUserType } from '../types'
export const DETAULT_USER_AVATAR = 'https://ssl.cdn.maodouketang.com/Fn2y9zZHL6Cp7tLDsUq5b1kF7S88'

export const USER_INFO_STORAGE_KEY = btoa('rcore-user-info')

export const RoleNameMap = {
  [EUserType.STUDENT]: 'student',
  [EUserType.TEACHER]: 'teacher',
  [EUserType.TUTOR]: 'ta',
  [EUserType.ADMIN]: 'admin',
  [EUserType.VISITOR]: 'visitor',
  [EUserType.PARENT]: 'parent'
}
