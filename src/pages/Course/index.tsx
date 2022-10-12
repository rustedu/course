import { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../../api'
import { SITE_COVER, RUST_LOGO, recommandTeachars, ITeachar } from '../../constants'

import './index.scss'

enum ETabs {
  INDEX = 'INDEX',
  COURSE = 'COURSE',
  TEACHAR = 'TEACHAR',
  ABOUT = 'ABOUT'
}

const CourseList = ({ showAll }: { showAll: boolean }) => {
  const navigate = useNavigate()
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [popularCourses, setPopularCourses] = useState<any[]>([])
  const loadingRef = useRef({ popularCourses: false, allCourses: false })

  const data = showAll ? allCourses : popularCourses
  const loadingKey = showAll ? 'allCourses' : 'popularCourses'

  const getCourses = useCallback(async () => {
    if (loadingRef.current[loadingKey]) {
      return
    }
    loadingRef.current[loadingKey] = true
    const res = await api.getCourses(!showAll)
    const { courseList } = res
    showAll ? setAllCourses(courseList) : setPopularCourses(courseList)
  }, [showAll, loadingKey])

  const loadCourses = useCallback(async () => {
    getCourses()
  }, [getCourses])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  return (
    <div className="course-list">
      {data.map((item) => (
        <div key={item.id} className="course-item" onClick={() => navigate(`course/${item.courseId}`)}>
          <img className="course-item-cover" src={item.coverUrl} alt="coverUrl" />
          <div className="course-item-info">
            <div className="info-title">{item.title}</div>
            <div className="summary">{item.summary}</div>
          </div>
          <footer>
            <span className="apply-num">
              <span className="apply-num-person">{item.applyCount}</span> 人报名学习
            </span>
            <span className="apply-price">¥ {item.price}</span>
          </footer>
        </div>
      ))}
    </div>
  )
}
const TeacharList = ({ showAll }: { showAll: boolean }) => {
  const [allTeachars, setAllTeachars] = useState<ITeachar[]>([])

  const loadData = useCallback(async () => {
    if (showAll && allTeachars.length === 0) {
      const res = await api.getTeachars()
      const { teacherList } = res
      setAllTeachars(teacherList)
    }
  }, [showAll, allTeachars.length])

  useEffect(() => {
    loadData()
  }, [loadData])

  const data = showAll ? allTeachars : recommandTeachars

  return (
    <div className="teachar-recommand">
      {data.map((teachar) => (
        <div key={teachar.name} className="teachar-intro">
          <img src={teachar.avatarUrl} alt="avatar" className="avatar" />
          <div className="info">
            <div className="teachar-title">
              <div className="teachar-name">{teachar.name}老师</div>
              <span className="teachar-tag">
                课程<span>{teachar.coursesCount}</span>
                学生<span>{teachar.studentsCount}</span>
              </span>
            </div>
            <div className="teach-intro">{teachar.info}</div>
          </div>
        </div>
      ))}
    </div>
  )
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
function CourseHome() {
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
    <div className="course-wrapper">
      <header>
        <img className="course-cover" src={SITE_COVER} alt="site-cover" />
        <img src="/logo.png" alt="logo-mark" className="logo-mark" />
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

export default CourseHome
