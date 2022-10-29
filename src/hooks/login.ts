import { useState, useEffect, useCallback } from 'react'
import { USER_INFO_STORAGE_KEY } from '@/constants'
import { useAppState } from '@/hooks'

export const useLogined = (needPhone?: boolean): [boolean, string?] => {
  const [logined, setLogined] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>()

  const {
    state: { currentUser },
    dispatch
  } = useAppState()

  const login = (phone: string) => {
    setLogined(true)
    setPhone(phone)
    dispatch({
      type: 'LOGIN',
      payload: {
        phone
      }
    })
  }

  const initUserInfo = useCallback(() => {
    const phone = localStorage.getItem(USER_INFO_STORAGE_KEY)
    if (phone) {
      login(phone)
    }
  }, [])

  useEffect(() => {
    initUserInfo()
  }, [initUserInfo])

  useEffect(() => {
    if (currentUser?.phone) {
      setLogined(true)
      setPhone(currentUser.phone)
    } else {
      if (logined) {
        setLogined(false)
        setPhone(undefined)
      }
    }
  }, [logined, currentUser?.phone])

  if (needPhone) {
    return [logined, phone]
  }

  return [logined]
}
