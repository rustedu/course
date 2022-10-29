import { useNavigate } from 'react-router-dom'
import LoginStatus from './LoginStatus'
import Icon from '@/components/Icon'

const Header = ({ isMobile }: { isMobile?: boolean }) => {
  const navigate = useNavigate()
  return (
    <header className="main-header">
      <div className="header-content content">
        <a href="/homepage/">
          <img src={siteConfig.logo} alt="logo" />
          <span className="action-item">社区</span>
        </a>
        <span onClick={() => navigate('//')}>
          <Icon symbol="icon-home" />
          首页
        </span>
        <span>
          <LoginStatus isMobile={isMobile} />
          我的
        </span>
      </div>
    </header>
  )
}

export default Header
