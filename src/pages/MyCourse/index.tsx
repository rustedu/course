import { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { map, find } from 'lodash'
import { useAppState } from '../../hooks'
import { getMyCourses } from '../../api'
import { RoleNameMap } from '../../constants'
import { EUserType } from '../../types'
import { layoutPrifix, ELayoutType } from '@/pages/Course'
import Loading from '../../components/Loading'
import Icon from '../../components/Icon'

import './index.scss'

const MyCourseList = () => {
  const [myCourses, setMyCourses] = useState<any[]>([])
  const [total, setTotal] = useState<number>()
  const [layout, setLayout] = useState(localStorage.getItem(layoutPrifix) || ELayoutType.LIST)
  const {
    state: { currentUser, myRegisters }
  } = useAppState()
  const navigate = useNavigate()

  const loadMyCourses = useCallback(async () => {
    if (currentUser?.phone) {
      const { courseList, totalNum } = await getMyCourses(currentUser?.phone)
      setMyCourses(courseList)
      setTotal(totalNum)
    }
  }, [currentUser?.phone])
  useEffect(() => {
    loadMyCourses()
  }, [loadMyCourses])

  if (!currentUser?.phone) {
    navigate('/')
    return null
  }

  const enterClass = (course: any) => {
    const registerInfo: any = find(myRegisters, ({ courseId }) => courseId === course.courseId)
    const status: EUserType = registerInfo.status
    const url = `${siteConfig.roomURL}?username=${registerInfo.name}&userId=${
      currentUser.phone
    }&role=${RoleNameMap[status] || 'student'}&roomId=${course.roomId}&video=${
      course.ishd || '480p'
    }`
    window.open(url)
  }

  const isGrid = layout === ELayoutType.GRID
  const changeLayout = () => {
    const layout = isGrid ? ELayoutType.LIST : ELayoutType.GRID
    setLayout(layout)
    localStorage.setItem(layoutPrifix, layout)
  }

  return (
    <div className="mycourse-list-wrapper">
      <header>
        <div className="title">我的课程</div>

        <div className="totol-register-count">
          共报名课程: <strong>{total}</strong>
        </div>
      </header>

      {total === undefined ? (
        <Loading />
      ) : (
        <div
          className={`mycourse-list ${
            isGrid ? 'mycourse-list-layout-grid' : 'mycourse-list-layout-list'
          }`}
        >
          <span className="layout-icon" onClick={changeLayout}>
            <Icon symbol={layout === ELayoutType.GRID ? 'icon-listgrid' : 'icon-list'} />
          </span>
          {map(myCourses, (course: any, index) => (
            <div
              key={course.id + course.courseIndex + course.title + index}
              className="course-item"
              onClick={() => navigate(`/${course.courseId}`)}
            >
              <img className="course-item-cover" src={course.coverUrl} alt="cover" />
              <div className="course-item-content">
                <div>
                  <h3>{course.title}</h3>
                  <div className="summary">{course.summary}</div>
                </div>
                <div className="room">
                  <span> 教室号: {course.roomId} </span>
                  <button
                    className="btn enter-class-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      enterClass(course)
                    }}
                  >
                    进入课堂
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCourseList
