import { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../../api'
import Loading from '../../components/Loading'
import Icon from '../../components/Icon'

import './index.scss'
export enum ELayoutType {
  LIST = 'LIST',
  GRID = 'GRID'
}

export const layoutPrifix = 'course-layout-type'
const CourseList = ({ showAll }: { showAll: boolean }) => {
  const navigate = useNavigate()
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [popularCourses, setPopularCourses] = useState<any[]>([])
  const loadingRef = useRef({ popularCourses: false, allCourses: false })
  const [layout, setLayout] = useState(localStorage.getItem(layoutPrifix) || ELayoutType.LIST)

  const data = showAll ? allCourses : popularCourses
  const loadingKey = showAll ? 'allCourses' : 'popularCourses'

  const getCourses = useCallback(async () => {
    if (loadingRef.current[loadingKey]) {
      return
    }
    const res = await api.getCourses(!showAll)
    const { courseList } = res
    showAll ? setAllCourses(courseList) : setPopularCourses(courseList)
    loadingRef.current[loadingKey] = true
  }, [showAll, loadingKey])

  const loadCourses = useCallback(async () => {
    getCourses()
  }, [getCourses])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  if (!loadingRef.current[loadingKey]) {
    return <Loading />
  }
  const isGrid = layout === ELayoutType.GRID
  const changeLayout = () => {
    const layout = isGrid ? ELayoutType.LIST : ELayoutType.GRID
    setLayout(layout)
    localStorage.setItem(layoutPrifix, layout)
  }
  return (
    <div
      className={`course-list ${
        isGrid ? 'course-list-layout-grid' : 'course-list-layout-list'
      }`}
    >
      <span className="layout-icon" onClick={changeLayout}>
        <Icon symbol={isGrid ? 'icon-listgrid' : 'icon-list'} />
      </span>
      {data.map((item) => (
        <div key={item.id} className="course-item" onClick={() => navigate(`/${item.courseId}`)}>
          <img className="course-item-cover" src={item.coverUrl} alt="coverUrl" />
          <div className="course-item-content">
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
        </div>
      ))}
    </div>
  )
}

export default CourseList
