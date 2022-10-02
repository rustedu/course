import { useCallback, useEffect, useState } from 'react'

import './index.scss'

const teachars = [
  {
    name: '陈渝',
    avatar: 'https://ssl.cdn.maodouketang.com/Fr9F1UyACJkeHBHzDG668H5sZm9B',
    course: 11,
    student: 275,
    intro:
      '博士，清华大学计算机系副教授、中国计算机学会普适计算专委会副主任，系统软件专委委员，清华大学信息技术研究院操作系统研究中心负责人。主要科研方向：操作系统、系统安全，嵌入式系统，普适计算、高性能计算等。'
  },
  {
    name: '向勇',
    avatar: 'https://ssl.cdn.maodouketang.com/Fg6ktGGhsirExxmSKDsirP3MADSc',
    course: 9,
    student: 180,
    intro:
      '博士，清华大学计算机系副教授，自2000年开始从事操作系统课的教学工作，科研方向包括无线自组网、计算机支持的协同工作和操作系统，曾主持或参与国家自然科学基金项目《支持多信道的自组网及其与Internet 互连的研究'
  }
]
function CourseList() {
  const [data, setData] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [tab, setTab] = useState('index')

  const loadCourse = useCallback(async () => {
    const res = await fetch(
      'https://admin.maodouketang.com:8443/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&clientId=385&tag=hot&isDelete=1&sort=courseIndex,asc'
    ).then((res) => res.json())

    console.log(res)
    const { totalNum, courseList } = res
    setData(courseList)
    setCount(totalNum)
  }, [])

  useEffect(() => {
    loadCourse()
  }, [loadCourse])

  const nav = [
    {
      key: 'index',
      title: '主页'
    },
    {
      key: 'course',
      title: '课程'
    },
    {
      key: 'teachar',
      title: '老师'
    },
    {
      key: 'about',
      title: '关于我们'
    }
  ]
  return (
    <div className="course-wrapper">
      <header>
        <img
          className="course-cover"
          src="https://ssl.cdn.maodouketang.com/FjgLOJxk9iLPzy7cg215rhvzLHiq"
          alt="site-cover"
        />
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
        <section>
          <div className="title">热门课程</div>
          <div className="course-list">
            {data.map((item) => (
              <div key={item.id} className="course-item">
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
        </section>

        <section>
          <div className="title">推荐名师</div>
          <div className="teachar-recommand">
            {teachars.map((teachar) => (
              <div key={teachar.name} className="teachar-intro">
                <img src={teachar.avatar} alt="avatar" className="avatar" />
                <div className="info">
                  <div className="teachar-title">
                    <div className="teachar-name">{teachar.name}老师</div>
                    <span className="teachar-tag">
                      课程<span>{teachar.course}</span>
                      学生<span>{teachar.student}</span>
                    </span>
                  </div>
                  <div className="teach-intro">{teachar.intro}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="title">机构介绍</div>
          <div className="organize">
            <div className="intro">
              操作系统是计算机系统中负责管理各种软硬件资源的核心系统软件，为应用软件运行提供良好的环境。掌握操作系统的基本原理及其核心技术是研究型大学计算机专业本科毕业生的基本要求。
              本课程是计算机专业核心课，以主流操作系统为实例，以教学操作系统ucore为实验环境，讲授操作系统的概念、基本原理和实现技术，为学生从事操作系统软件研究和开发，以及充分利用操作系统功能进行应用软件研究和开发打下扎实的基础。
            </div>
            <img
              src="https://ssl.cdn.maodouketang.com/FnDocVSzq_KL5kzpWs1ltDgpyvhb"
              alt="organize-logo"
              className="organize-logo"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default CourseList
