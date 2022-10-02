import React from 'react'

const Header = () => {
  return (
    <header>
      <div className="header-content content">
        <div className="logo-area">
          <img src="/logo.png" alt="logo" />
          <span className="logo-key">rCore</span>
          <span className="logo-content">开源操作系统培训</span>
        </div>

        <div className="actions">
          <span className="action-item">首页</span>
          <span>登录</span>
        </div>
      </div>
    </header>
  )
}

export default Header
