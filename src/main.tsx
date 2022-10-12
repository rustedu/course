import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './Layout'
import CourseIndex from './pages/Course'
import CourseDetail from './pages/Course/Details'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CourseIndex />
      },
      {
        path: 'course',
        element: <CourseIndex />
      },
      {
        path: 'course/:id',
        element: <CourseDetail />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
