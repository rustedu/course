import { Spin, SpinProps } from 'antd'

import './index.css'

const Loading = (props: Partial<SpinProps>) => {
  return (
    <div className="loading-container">
      <Spin tip="数据加载中..." size="small" {...props} />
    </div>
  )
}

export default Loading
