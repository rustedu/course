export interface IUser {
  nickname: string
  avatar?: string
  // role: '',
  // access_token: '',
  // token: ''
  // status:'',
}


export type TAppState = { currentUser?: IUser }