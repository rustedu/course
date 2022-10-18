import { map } from 'lodash'

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="footer-info">
          <section>
            <div className="sub-title">{siteConfig.title}</div>
            <div className="sub-items">
              <span>{siteConfig.subTitle}</span>
            </div>
          </section>

          <section>
            <div className="sub-title">资源链接</div>
            <div className="sub-items">
              {map(siteConfig.footer.resources, ({ text, link }) => (
                <div key={link}>
                  <a href={link}>{text}</a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="sub-title">联系我们</div>
            <div className="sub-items">
              {map(siteConfig.footer.contact, ({ label, text }) => (
                <div key={label}>
                  <span>{label}：</span>
                  {text}
                </div>
              ))}
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
