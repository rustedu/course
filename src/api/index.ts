const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getCourses(popular?: boolean) {
  const url = popular
    ? `${BASE_URL}/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&clientId=385&tag=hot&isDelete=1&sort=courseIndex,asc`
    : `${BASE_URL}/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&isDelete=1&clientId=385&sort=courseIndex,asc`

  return await fetch(url).then((res) => res.json())
}

export async function getTeachars(recommand?: boolean) {
  const url = `${BASE_URL}/seller/api/teachers/getAllTeachersByConditionsWithTotal?page=0&size=6&clientId=385`
  return await fetch(url).then((res) => res.json())
}
