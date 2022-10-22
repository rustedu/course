import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from './Layout'

const HomePage = lazy(() =>  import('./pages/HomePage'))
const CourseDetail = lazy(() => import('./pages/Course/Details'))
const MyCourseList = lazy(() => import('./pages/MyCourse'))
const CourseReplay = lazy(() => import('./pages/Course/Replay'))

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
          path: '/:id/replay/:replayId',
          element: <CourseReplay />
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
