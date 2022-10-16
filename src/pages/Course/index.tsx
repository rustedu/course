import { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../../api'

import "./index.scss"

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
        <div
          key={item.id}
          className="course-item"
          onClick={() => navigate(`/course/${item.courseId}`)}
        >
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

export default CourseList
