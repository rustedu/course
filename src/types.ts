type IDType = number | string

export enum EUserType {
  STUDENT = '1',
  TEACHER = '2',
  VISITOR = '3',
  TUTOR = '4',
  ADMIN = '5',
  PARENT = '6'
}

export interface ICurrentUser {
  phone?: string | null
}

export interface IMyRegister {
  id: IDType
  clientId: IDType
  courseId: IDType
  classId: IDType
  userId: IDType
  type: string
  name: string
  avatalUrl: null
  phone: string
  email: string
  gender: string
  age: string
  location: string
  company: string
  tag: string
  status: EUserType
  createdAt: string
  updatedAt: string
  verify: string
  uniCourseId: IDType
  tencentUserId: IDType
}
