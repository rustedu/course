import { useCallback, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAppState } from '../context'
import { getMyCourses } from '../api'

import './index.scss'

const Layout = () => {
  const {
    state: { currentUser },
    dispatch
  } = useAppState()
  const loadMyCourses = useCallback(async () => {
    if (currentUser?.phone) {
      const res = await getMyCourses(currentUser?.phone)
      dispatch({
        type: 'UPDATE_MY_COURSES',
        payload: res
      })
    }
  }, [currentUser?.phone])
  useEffect(() => {
    loadMyCourses()
  }, [loadMyCourses])
  return (
    <div className="container">
      <Header />
      <main>
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default Layout
