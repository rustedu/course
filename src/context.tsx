import React, { useReducer, createContext, useContext } from 'react'
import { DETAULT_USER_AVATAR } from './constants'

import type { IUser } from './types'

export type AppState = { currentUser?: IUser }

type Action = { type: 'LOGIN'; payload: IUser } | { type: 'LOGOUT' }

const rootReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, currentUser: action.payload }
    }
    case 'LOGOUT': {
      return { ...state, currentUser: undefined }
    }
    default: {
      throw new Error(`[count-context] Unhandled action type: ${(action as any).type}`)
    }
  }
}

const initialState: AppState = {
  currentUser: { nickname: '', avatar: DETAULT_USER_AVATAR }
}
const defaultDispatch: React.Dispatch<Action> = () => initialState // we never actually use this
const AppContext = createContext({
  state: initialState,
  dispatch: defaultDispatch // just to mock out the dispatch type and make it not optioanl
})

function StateProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(rootReducer, initialState)
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
