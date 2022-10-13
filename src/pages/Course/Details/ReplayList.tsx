import React from 'react'
import { map } from 'lodash'

const ReplayList = (props: { data?: any[] }) => {
  return (
    <div className="list-wrap">
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>
              <span>教室号</span>
            </th>
            <th>
              <span>课程名称</span>
            </th>
            <th>
              <span>开始时间</span>
            </th>
            <th>
              <span>上课地点</span>
            </th>
            <th>
              <span>备注</span>
            </th>
            <th>
              <span>进入课程</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {map(props.data, (replay, index) => (
            <tr key={replay.id}>
              <td className="lalign">
                <span>{index + 1}</span>
                {replay.roomId}
              </td>
              <td>{replay.className}</td>
              <td>{replay.startAt}</td>
              <td>{replay.location}</td>
              <td>{replay.remark}</td>
              <td>
                <a href={replay.choseUrl} target="_blank">
                  观看
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReplayList
