import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDeviceDetect, useFetchMyRegister } from '../hooks'

import './index.scss'
import './index-mobile.scss'

const Layout = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const md = useDeviceDetect()
  const isMobile = !!md?.mobile()

  useFetchMyRegister()

  return (
    <div className={`container ${isMobile ? 'container-mobile' : ''}`}>
      <Header isMobile={isMobile} />
      <main>
        <div className="content">
          <Outlet />
        </div>
        {isHomePage && <Footer />}
      </main>
    </div>
  )
}

export default Layout
