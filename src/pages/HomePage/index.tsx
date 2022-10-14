import { useState } from 'react'
import { SITE_COVER, RUST_LOGO } from '../../constants'
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
      <header>
        <img className="intro-cover" src={SITE_COVER} alt="site-cover" />
        <img src="/img/logo.png" alt="logo-mark" className="logo-mark" />
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

      <main>
        {renderMainContent()}
        <section className={setTabClassName(isIndexTab || tab === ETabs.ABOUT)}>
          <div className="title">机构介绍</div>
          <div className="organize">
            <div className="intro">
              操作系统是计算机系统中负责管理各种软硬件资源的核心系统软件，为应用软件运行提供良好的环境。掌握操作系统的基本原理及其核心技术是研究型大学计算机专业本科毕业生的基本要求。
              本课程是计算机专业核心课，以主流操作系统为实例，以教学操作系统ucore为实验环境，讲授操作系统的概念、基本原理和实现技术，为学生从事操作系统软件研究和开发，以及充分利用操作系统功能进行应用软件研究和开发打下扎实的基础。
            </div>
            <img src={RUST_LOGO} alt="organize-logo" className="organize-logo" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
