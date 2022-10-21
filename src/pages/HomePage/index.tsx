import { useState } from 'react'
import { Spin } from 'antd'
import { useSiteInfo } from '../../hooks'
import CourseList from '../Course'
import TeacharList from '../Course/TeacherList'

import './index.scss'

enum ETabs {
  INDEX = 'INDEX',
  COURSE = 'COURSE',
  TEACHAR = 'TEACHAR',
  ABOUT = 'ABOUT'
}

const nav = [
  {
    key: ETabs.INDEX,
    title: '主页'
  },
  {
    key: ETabs.COURSE,
    title: '课程'
  },
  {
    key: ETabs.TEACHAR,
    title: '老师'
  },
  {
    key: ETabs.ABOUT,
    title: '关于我们'
  }
]

const setTabClassName = (show: boolean) => {
  return show ? 'tab-show' : ''
}
function HomePage() {
  const [tab, setTab] = useState<ETabs>(ETabs.INDEX)
  const isIndexTab = tab === ETabs.INDEX

  const { config, loading } = useSiteInfo()

  const renderMainContent = () => {
    return (
      <>
        <section className={setTabClassName(tab === ETabs.INDEX || tab === ETabs.COURSE)}>
          <div className="title">{isIndexTab ? '热门课程' : '全部课程'}</div>
          <CourseList showAll={tab === ETabs.COURSE} />
        </section>
        <section className={setTabClassName(tab === ETabs.INDEX || tab === ETabs.TEACHAR)}>
          <div className="title">{isIndexTab ? '推荐名师' : '全部名师'}</div>
          <TeacharList showAll={tab === ETabs.TEACHAR} />
        </section>
      </>
    )
  }
  return (
    <div className="home-wrapper">
      <Spin spinning={loading}>
        <header className="home-wrapper-header">
          <img className="intro-cover" src={config.coverUrl} alt="site-cover" />
          <img className="logo-mark" src={config.consultUrl} alt="logo-mark" />
          <ul className="nav">
            {nav.map((item) => (
              <li
                className={`${item.key === tab ? 'active' : ''}`}
                key={item.key}
                onClick={() => setTab(item.key)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </header>

        <main className="home-wrapper-content">
          {renderMainContent()}
          <section className={setTabClassName(isIndexTab || tab === ETabs.ABOUT)}>
            <div className="title">机构介绍</div>
            <div className="organize">
              <div className="intro">{config.aboutUsInfo}</div>
              <img src={config.aboutUsImgUrl} alt="organize-logo" className="organize-logo" />
            </div>
          </section>
        </main>
      </Spin>
    </div>
  )
}

export default HomePage
