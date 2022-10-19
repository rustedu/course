import { useNavigate } from 'react-router-dom'
import LoginStatus from './LoginStatus'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <div className="header-content content">
        <div className="logo-area" onClick={() => navigate('//')}>
          <img src={siteConfig.logo} alt="logo" />
          <span className="logo-content">{siteConfig.title}</span>
        </div>

        <div className="actions">
          <a href="/homepage/">
            <span className="action-item">社区</span>
          </a>
          <LoginStatus />
        </div>
      </div>
    </header>
  )
}

export default Header
