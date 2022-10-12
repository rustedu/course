import request from '../utils/request'

export async function getCourses(popular?: boolean) {
  const url = popular
    ? `/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&clientId=385&tag=hot&isDelete=1&sort=courseIndex,asc`
    : `/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&isDelete=1&clientId=385&sort=courseIndex,asc`

  return await request(url)
}

export async function getCourse(id: string) {
  const res =  await request<never, any[]>('/seller/api/courses', {
    params: {
      'clientId.equals': 385,
      'courseId.equals': id
    }
  })
  return res[0]
}

export async function getTeachars() {
  return await request('/seller/api/teachers/getAllTeachersByConditionsWithTotal?page=0&size=6&clientId=385')
}

export async function getStudentOfCourse(courseId: string) {
  const res =  await request<never, any[]>('/seller/api/students', {
    params: {
      'clientId.equals': 385,
      'courseId.equals': courseId,
      size: 2000,
    }
  })
  return res
}