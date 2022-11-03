import { map } from 'lodash'
import Icon from '@/components/Icon'
import { useDeviceDetect } from '@/hooks'
import { useNavigate } from 'react-router-dom'

const headers = ['教室号', '课程名称', '开始时间', '上课地点', '备注', '课堂回放']

const ReplayList = (props: { data?: any[] }) => {
  const md = useDeviceDetect()
  const navigate = useNavigate()

  const openReplay = async (replay: any) => {
    return navigate(`replay/${replay.id}`)
  }

  if (!!md?.mobile()) {
    return (
      <div className="list-mobile">
        {map(props.data, (replay) => (
          <div key={replay.id} className="list-item" onClick={() => openReplay(replay)}>
            <div className="list-item-main-info">
              <div className="info-name">
                {replay.className}
                <span className="location-tag">{replay.location}</span>
              </div>
              <div>
                <span className="list-item-label">教室号:</span> {replay.roomId}
              </div>

              <div>
                <span className="list-item-label">开始时间:</span> {replay.startAt}
              </div>
              <div>
                <span className="list-item-label">备注:</span> {replay.remark}
              </div>
            </div>
            <div className="list-item-actions">
              <Icon symbol="icon-bofang" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="list-wrap">
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>
                <span>{h}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {map(props.data, (replay, index) => (
            <tr key={replay.id}>
              <td className="lalign">
                <span className="index">{index + 1}</span>
                {replay.roomId}
              </td>
              <td>{replay.className}</td>
              <td>{replay.startAt}</td>
              <td>{replay.location}</td>
              <td>{replay.remark}</td>
              <td>
                <span className="player-btn" onClick={() => openReplay(replay)}>
                  <Icon symbol="icon-bofang" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReplayList
