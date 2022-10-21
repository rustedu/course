import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useDeviceDetect, useFetchMyRegister } from '../hooks'

import './index.scss'
import './index-mobile.scss'

const Layout = () => {
  const md = useDeviceDetect()
  useFetchMyRegister()
  return (
    <div className={`container ${md?.mobile() ? 'container-mobile' : ''}`}>
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
