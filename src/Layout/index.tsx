import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className="course-container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
