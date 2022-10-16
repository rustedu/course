import ReactDOM from 'react-dom/client'
import { StateProvider } from './context'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StateProvider>
    <RouterProvider router={router} />
  </StateProvider>
)
