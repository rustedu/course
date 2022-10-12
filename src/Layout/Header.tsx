import React from 'react'
import { Link, useNavigate, useRoutes } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <div className="header-content content">
        <div className="logo-area" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="logo" />
          <span className="logo-key">rCore</span>
          <span className="logo-content">开源操作系统培训</span>
        </div>

        <div className="actions">
          <Link to="/">
            <span className="action-item">首页</span>
          </Link>
          <span>登录</span>
        </div>
      </div>
    </header>
  )
}

export default Header
