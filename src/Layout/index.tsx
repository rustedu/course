import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useFetchMyRegister } from '../hooks'

import './index.scss'

const Layout = () => {
  useFetchMyRegister()
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
