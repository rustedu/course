import React, { useReducer, createContext, useContext } from 'react'
import { USER_INFO_STORAGE_KEY } from './constants'

import type { ICurrentUser, IMyRegister } from './types'

export type TAppState = {
  currentUser?: ICurrentUser
  myRegisters?: IMyRegister[]
  loginDialogVisible: boolean
}

type Action =
  | { type: 'LOGIN'; payload: ICurrentUser }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_MY_COURSES'; payload?: IMyRegister[] }
  | { type: 'UPDATE_LOGIN_DIALOG_VISIBLE'; payload: boolean }

const rootReducer = (state: TAppState, action: Action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, currentUser: action.payload }
    }
    case 'LOGOUT': {
      return { ...state, currentUser: undefined }
    }
    case 'UPDATE_MY_COURSES': {
      return { ...state, myRegisters: action.payload }
    }
    case 'UPDATE_LOGIN_DIALOG_VISIBLE': {
      return { ...state, loginDialogVisible: action.payload }
    }
    default: {
      throw new Error(`[count-context] Unhandled action type: ${(action as any).type}`)
    }
  }
}

const initialState: TAppState = {
  currentUser: { phone: localStorage.getItem(USER_INFO_STORAGE_KEY) },
  myRegisters: [],
  loginDialogVisible: false
}
const defaultDispatch: React.Dispatch<Action> = () => initialState // we never actually use this
const AppContext = createContext({
  state: initialState,
  dispatch: defaultDispatch // just to mock out the dispatch type and make it not optioanl
})

function StateProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<TAppState, Action>>(rootReducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }} {...props} />
}

const useAppState = () => {
  const ctx = useContext(AppContext)
  if (ctx === undefined) {
    throw new Error('useCount must be used with a CountProvider')
  }

  return ctx
}

export { useAppState, StateProvider }
