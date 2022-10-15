import { Link, useNavigate } from 'react-router-dom'
import LoginStatus from './LoginStatus'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <div className="header-content content">
        <div className="logo-area" onClick={() => navigate('/')}>
          <img src="/img/logo.png" alt="logo" />
          <span className="logo-key">rCore</span>
          <span className="logo-content">开源操作系统培训</span>
        </div>

        <div className="actions">
          <Link to="/">
            <span className="action-item">首页</span>
          </Link>
          <LoginStatus />
        </div>
      </div>
    </header>
  )
}

export default Header
