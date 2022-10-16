import { Spin } from 'antd'

import './index.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <Spin size="large" tip="加载中..." />
    </div>
  )
}

export default Loading
