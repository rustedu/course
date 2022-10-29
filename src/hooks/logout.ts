import { useCallback } from 'react'
import { useAppState } from '.'
import { USER_INFO_STORAGE_KEY } from '../constants'

export const useLogout = () => {
  const { dispatch } = useAppState()

  const logout = useCallback(() => {
    localStorage.removeItem(USER_INFO_STORAGE_KEY)
    dispatch({
      type: 'LOGOUT'
    })
  }, [])

  return logout
}
