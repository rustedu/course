import { useCallback, useEffect } from 'react'
import { useAppState } from '.'
import { getMyRegisters } from '../api'

// 获取当前登录用户的注册课程信息
export const useFetchMyRegister = () => {
  const {
    state: { currentUser },
    dispatch
  } = useAppState()

  const loadMyRegister = useCallback(async () => {
    if (currentUser?.phone) {
      const res = await getMyRegisters(currentUser?.phone)
      dispatch({
        type: 'UPDATE_MY_COURSES',
        payload: res
      })
    }
  }, [currentUser?.phone])

  useEffect(() => {
    loadMyRegister()
  }, [loadMyRegister])
}
