import { createBrowserRouter } from 'react-router-dom'

import Layout from './Layout'
import HomePage from './pages/HomePage'
import CourseDetail from './pages/Course/Details'
import MyCourseList from './pages/MyCourse'

export default createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: '/:id',
          element: <CourseDetail />
        },
        {
          path: 'myCourse',
          element: <MyCourseList />
        }
      ]
    }
  ],
  { basename: '/course' }
)
