import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { StateProvider } from './context'
import { RouterProvider } from 'react-router-dom'
import Loading from '@/components/Loading'
import router from './router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StateProvider>
    <Suspense
      fallback={
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
          <Loading size="large" tip="页面加载中..." delay={500} />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StateProvider>
)
