import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { last, groupBy, keys, sortBy } from 'lodash'
import { useParams } from 'react-router-dom'
import Tabs from '../../../components/Tabs'
import StudentList, { EStudentType } from './StudentList'
import ReplayList from './ReplayList'
import { getCourse, getStudentOfCourse, getReplayOfCourse } from '../../../api'

import './index.scss'

const CourseDetail = () => {
  const [courseInfo, setCourseInfo] = useState<any>({})
  // const [students, setStudents] = useState<any[]>([])
  const detailRef = useRef<
    Partial<{
      applyStudents: any[]
      applyMember: any[]
      teacher: any
      if_teacher: boolean

      replayList: any[]
      validReplayList: any[]
    }>
  >({})

  const [loading, setLoading] = useState(true)
  const { id: courseId } = useParams<{ id: string }>()
  const loadData = useCallback(async () => {
    if (courseId) {
      const courseInfo = await getCourse(courseId)

      // 课程报名成员信息
      const studentResult = await getStudentOfCourse(courseId)
      const studentCategories = groupBy(studentResult, 'status')
      const teacher = studentCategories[EStudentType.TEACHER] || []
      const tutors = studentCategories[EStudentType.TUTOR] || []
      const admins = studentCategories[EStudentType.ADMIN] || []
      let students: any[] = []
      keys(studentCategories)
        .filter(
          (key) =>
            ![EStudentType.TEACHER, EStudentType.TUTOR, EStudentType.ADMIN].includes(
              key as EStudentType
            )
        )
        .forEach((key) => {
          students = students.concat(studentCategories[key])
        })

      detailRef.current.applyStudents = students
      detailRef.current.teacher = last(teacher)
      detailRef.current.applyMember = teacher.concat(tutors, admins, students)
      detailRef.current.if_teacher = !detailRef.current.teacher

      // 课程回放数据
      const courseResult = await getReplayOfCourse(courseId)
      detailRef.current.replayList = courseResult
      detailRef.current.validReplayList = sortBy(
        courseResult.filter(({ status }) => status == 1) || [],
        (c) => c.startAt
      )

      setCourseInfo(courseInfo)
      // setStudents(students)
      setLoading(false)
    }
  }, [courseId])
  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return <div>loading...</div>
  }

  const tabs = [
    {
      key: 'intro',
      title: '课程介绍',
      content: <div dangerouslySetInnerHTML={{ __html: courseInfo.introduction }} />
    },
    {
      key: 'student',
      title: `报名成员(${detailRef.current.applyMember?.length || 0})`,
      content: <StudentList data={detailRef.current.applyMember} />
    },
    {
      key: 'replay',
      title: `课程回放(${detailRef.current.validReplayList?.length})`,
      content: <ReplayList data={detailRef.current.validReplayList} />
    }
  ]
  return (
    <div className="course-detail-wrapper">
      <section className="main-content">
        <img src={courseInfo.coverUrl} alt="coverUrl" className="course-cover" />

        <div className="course-main-info">
          <div className="course-title">{courseInfo.title}</div>

          <div className="course-info-item">任课教师: {detailRef.current.teacher?.name}</div>
          <div className="course-info-item">
            学生人数: {detailRef.current.applyStudents?.length} 人
          </div>

          <div className="course-actions">
            <div className="course-price">¥ {courseInfo.price}</div>
            <button className="btn"> 登录</button>
          </div>
        </div>
        <div className="share-area">
          <div className="share-box">
            <img src="/img/share.png" alt="share" />
            <span>分享二维码,</span>
            <span>邀请好友报名</span>
          </div>
          <div className="share-box">
            <img src="/img/minipro.jpeg" alt="mini" />
          </div>
        </div>
      </section>

      <section className="course-intro">
        <Tabs items={tabs} />
      </section>
    </div>
  )
}

export default CourseDetail
