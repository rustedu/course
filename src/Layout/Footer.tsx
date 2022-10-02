import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="footer-info">
          <section>
            <div className="sub-title">开源操作系统培训</div>
            <div className="sub-items">
              <span>促进操作系统的教学、研究与产业的发展</span>
            </div>
          </section>

          <section>
            <div className="sub-title">资源链接</div>
            <div className="sub-items">
              <div>
                <span> Rust基础教程</span>
              </div>
              <div>
                <span> 清华rCore操作系统实践教程</span>
              </div>
              <div>
                <span> 全国大学生操作系统设计大赛</span>
              </div>
            </div>
          </section>

          <section>
            <div className="sub-title">联系我们</div>
            <div className="sub-items">
              <div>电话：13691584139</div>
              <div>邮箱：hello@maodou.io</div>
              <div>地址：北京市海淀区清华科技园科技大厦C座G05</div>
            </div>
          </section>
        </div>
        <a className="record-number" href="https://beian.miit.gov.cn/#/Integrated/index">
          北京清华大学·京ICP备16045052号-11
        </a>
      </div>
    </footer>
  )
}

export default Footer
