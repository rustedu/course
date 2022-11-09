import { useCallback, useEffect, useState, useRef } from 'react'
import { last, groupBy, keys, sortBy, find } from 'lodash'
import { Popover } from 'antd'
import { useParams } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { EUserType as EStudentType, IMyRegister } from '../../../types'
import Tabs from '../../../components/Tabs'
import Loading from '../../../components/Loading'
import Icon from '../../../components/Icon'
import RegisterModal from '../../../components/RegisterModal'
import { useAppState, useDeviceDetect } from '../../../hooks'
import { RoleNameMap } from '../../../constants'
import { BASE_URL } from '@/utils/request'
import { getCourse, getStudentOfCourse, getReplayOfCourse } from '../../../api'
import StudentList from './StudentList'
import ReplayList from './ReplayList'

import './index.scss'

const Share = (props: { courseInfo: any; isMobile?: boolean }) => {
  const {
    state: { currentUser, myRegisters },
    dispatch
  } = useAppState()
  const { id: courseId } = useParams<{ id: string }>()
  const shareAreaRef = useRef<HTMLImageElement>(null)
  const qrcodeRef = useRef<any>(null)

  let miniQRPath: string = ''
  if (currentUser?.phone) {
    const registerCourse = find(myRegisters, (course) => course.courseId === courseId)

    if (!!registerCourse) {
      const path = encodeURIComponent(
        `pages/room/room?userId=${registerCourse.phone}-m&roomId=${props.courseInfo.roomId}&role=${
          RoleNameMap[registerCourse.status] || 'student'
        }&username=${registerCourse.name}-m`
      )
      miniQRPath = `${BASE_URL}/seller/api/room/path.jpg?path=${path}`
    } else {
      const path = encodeURIComponent(`pages/index/index?roomId=${props.courseInfo.roomId}`)
      miniQRPath = `${BASE_URL}/seller/api/room/path.jpg?path=${path}`
    }
  }

  useEffect(() => {
    if (qrcodeRef.current) {
      const svg = qrcodeRef.current
      const svgData = new XMLSerializer().serializeToString(svg)
      shareAreaRef.current!.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
  }, [qrcodeRef.current])

  return (
    <>
      <QRCode
        ref={qrcodeRef}
        style={{ display: 'none', height: 'auto', maxWidth: '100%', width: '100%' }}
        value={window.location.href}
        fgColor="#3db477"
        viewBox={`0 0 256 256`}
      />
      <div className="share-box">
        <span>
          <Icon symbol="icon-share" />
          分享二维码
        </span>
        <span style={{ marginBottom: 10 }}>邀请好友加入课堂</span>
        <div className={`share-imgs ${props.isMobile ? 'share-imgs-mobile' : ''}`}>
          <img ref={shareAreaRef} alt="share-course" className="qr-code" />
          {miniQRPath && <img src={miniQRPath} alt="mini" />}
        </div>
      </div>
    </>
  )
}
const Action = (props: {
  courseInfo: any
  onRegisterCourse?: (newCourse: IMyRegister) => void
}) => {
  const {
    state: { currentUser, myRegisters },
    dispatch
  } = useAppState()
  const { id: courseId } = useParams<{ id: string }>()
  const openLoginDialog = () => {
    dispatch({
      type: 'UPDATE_LOGIN_DIALOG_VISIBLE',
      payload: true
    })
  }
  const enterCourse = (registerCourse: IMyRegister) => {
    const { name, phone, status } = registerCourse
    const url = `${siteConfig.roomURL}?username=${name}&userId=${phone}&role=${
      RoleNameMap[status] || 'student'
    }&roomId=${props.courseInfo.roomId}&video=${props.courseInfo.ishd || '480p'}`
    window.open(url)
  }

  if (currentUser?.phone) {
    const registerCourse = find(myRegisters, (course) => course.courseId === courseId)

    return !!registerCourse ? (
      <button className="btn" onClick={() => enterCourse(registerCourse)}>
        已报名，进入教室
      </button>
    ) : (
      <RegisterModal {...props} />
    )
  }
  return (
    <button className="btn" onClick={openLoginDialog}>
      登录
    </button>
  )
}
const CourseDetail = () => {
  const [courseInfo, setCourseInfo] = useState<any>({})
  const [students, setStudents] = useState<any[]>([])
  const md = useDeviceDetect()
  const detailRef = useRef<
    Partial<{
      applyStudents: any[]
      // applyMember: any[]
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

      detailRef.current.applyStudents = students // 排除 老师，助教，管理员, 剩下的才认为是学生
      detailRef.current.teacher = last(teacher)
      const allStudents = teacher.concat(tutors, admins, students)
      setStudents(allStudents)
      detailRef.current.if_teacher = !detailRef.current.teacher

      // 课程回放数据
      const courseResult = await getReplayOfCourse(courseId)
      detailRef.current.replayList = courseResult
      detailRef.current.validReplayList = sortBy(
        courseResult.filter(({ status }) => status == 1) || [],
        (c) => c.startAt
      )

      setCourseInfo(courseInfo)
      setLoading(false)
    }
  }, [courseId])
  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return <Loading />
  }

  const tabs = [
    {
      key: 'intro',
      title: '课程介绍',
      content: <div dangerouslySetInnerHTML={{ __html: courseInfo.introduction }} />
    },
    {
      key: 'student',
      title: `报名成员(${students?.length || 0})`,
      content: <StudentList data={students} />
    },
    {
      key: 'replay',
      title: `课堂回放(${detailRef.current.validReplayList?.length})`,
      content: <ReplayList data={detailRef.current.validReplayList} />
    }
  ]
  const handleRegister = (newCourse: any) => {
    setStudents((students || []).concat(newCourse))
    detailRef.current.applyStudents = (detailRef.current.applyStudents || []).concat(newCourse)
  }
  return (
    <div className="course-detail-wrapper">
      <section className="main-content">
        <img src={courseInfo.coverUrl} alt="coverUrl" className="course-cover" />

        <div className="course-main-info">
          <div className="course-title">{courseInfo.title}</div>

          <div className="course-info">
            <div className="course-info-item">
              <span className="course-info-item-label">任课教师: </span>
              {detailRef.current.teacher?.name}
            </div>
            <div className="course-info-item">
              <span className="course-info-item-label">学生人数: </span>
              {detailRef.current.applyStudents?.length} 人
            </div>
          </div>

          <div className="course-actions">
            <div className="course-price">¥ {courseInfo.price}</div>
            <Action courseInfo={courseInfo} onRegisterCourse={handleRegister} />
          </div>
        </div>
        {!!md?.mobile() ? (
          <Popover
            placement="leftTop"
            content={<Share courseInfo={courseInfo} isMobile />}
            trigger="click"
          >
            <span className="share-icon">
              <Icon symbol="icon-share" />
            </span>
          </Popover>
        ) : (
          <div className="share-area">
            <Share courseInfo={courseInfo} />
            {/* <div className="share-box">
            <img src="/img/minipro.jpeg" alt="mini" />
          </div> */}
          </div>
        )}
      </section>

      <section className="course-intro">
        <Tabs items={tabs} />
      </section>
    </div>
  )
}

export default CourseDetail
