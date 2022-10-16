import request from '../utils/request'
import type { IMyApplyCourse } from '../types'

const CLIENT_ID = 385
const PAGE_SIZE = 2000
export async function getCourses(popular?: boolean) {
  const url = popular
    ? `/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&clientId=${CLIENT_ID}&tag=hot&isDelete=1&sort=courseIndex,asc`
    : `/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&isDelete=1&clientId=${CLIENT_ID}&sort=courseIndex,asc`

  return await request<never, { courseList: any[] }>(url)
}

export async function getCourse(id: string) {
  const res = await request<never, any[]>('/seller/api/courses', {
    params: {
      'clientId.equals': CLIENT_ID,
      'courseId.equals': id
    }
  })
  return res[0]
}

export async function getTeachars() {
  return await request<never, { teacherList: any[] }>(
    `/seller/api/teachers/getAllTeachersByConditionsWithTotal?page=0&size=6&clientId=${CLIENT_ID}`
  )
}

export async function getStudentOfCourse(courseId: string) {
  const res = await request<never, any[]>('/seller/api/students', {
    params: {
      'clientId.equals': CLIENT_ID,
      'courseId.equals': courseId,
      size: PAGE_SIZE
    }
  })
  return res
}

export async function getReplayOfCourse(courseId: string) {
  const res = await request<never, any[]>('/seller/api/course-classes', {
    params: {
      'clientId.equals': CLIENT_ID,
      'courseId.equals': courseId,
      size: PAGE_SIZE,
      sort: 'startAt,desc'
    }
  })
  return res
}

export async function registerCourse(data: any) {
  const res = await request<never, IMyApplyCourse>('/seller/api/students', {
    method: 'POST',
    data
  })
  return res
}

export async function getMyCourses(phone: string) {
  const res = await request<never, IMyApplyCourse[]>('/seller/api/students', {
    params: {
      'clientId.equals': CLIENT_ID,
      'phone.equals': phone
    }
  })
  return res
}
