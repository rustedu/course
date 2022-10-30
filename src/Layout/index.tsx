import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Layout, { MainContent } from '@os2edu/layout'
import type { IExtraProps } from '@os2edu/layout/dist/types'

import Header from './Header'
import LoginStatus from './LoginStatus'
import Footer from './Footer'
import { useDeviceDetect, useFetchMyRegister, useLogined, useLogout } from '../hooks'

import './index.scss'
import './index-mobile.scss'

const AppLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  const needPhone = true
  const [logined, phone] = useLogined(needPhone)
  const logout = useLogout()
  const md = useDeviceDetect()
  const isMobile = !!md?.mobile()

  useFetchMyRegister()

  const redirectToHome = (
    <span className="nav-common-link nav-link" onClick={() => navigate('/')}>
      首页
    </span>
  )
  let extra: Partial<IExtraProps> = {
    customRender: (
      <>
        {redirectToHome}
        <LoginStatus />
      </>
    )
  }

  if (logined) {
    extra = {
      customRender: redirectToHome,
      userInfo: { phone },
      dropMenu: [
        {
          key: 'myCourse',
          title: '我的课程',
          onClick() {
            navigate('/myCourse')
          }
        },
        {
          key: 'logout',
          title: '退出登录',
          onClick() {
            logout()
          }
        }
      ]
    }
  }
  return (
    <Layout
      headerProps={{
        extra
      }}
      className={`container ${isMobile ? 'container-mobile' : ''}`}
    >
      <>
        {isMobile && <Header isMobile={true}/>}
        <MainContent>
          <Outlet />
        </MainContent>
        {isHomePage && <Footer />}
      </>
    </Layout>
  )
}

export default AppLayout
