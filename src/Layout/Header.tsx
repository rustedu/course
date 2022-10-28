import { useNavigate } from 'react-router-dom'
import LoginStatus from './LoginStatus'
import Icon from '@/components/Icon'

const Header = ({ isMobile }: { isMobile?: boolean }) => {
  const navigate = useNavigate()
  return (
    <header>
      {isMobile ? (
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
      ) : (
        <div className="header-content content">
          <div className="logo-area" onClick={() => navigate('//')}>
            <img src={siteConfig.logo} alt="logo" />
            <span className="logo-content">{siteConfig.title}</span>
            <div className="actions">
              <a href="/course/">
                <span className="action-item">课程培训</span>
              </a>
            </div>
          </div>

          <div className="actions">
            <a href="/homepage/">
              <span className="action-item">社区首页</span>
            </a>
            <LoginStatus />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
