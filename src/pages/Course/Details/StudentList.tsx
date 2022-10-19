import { map, isEmpty } from 'lodash'
import { Empty } from 'antd'
import { EUserType } from '../../../types'

import './StudentList.scss'

const iconMap: Record<string, string> = {
  '2': 'status-teacher.png',
  '4': 'status-ta.png',
  '5': 'status-admin.png'
}

const StudentList = (props: { data?: any[] }) => {
  if (isEmpty(props.data)) {
    return (
      <div className="studentlist-wrap">
        <Empty />
      </div>
    )
  }
  return (
    <div className="list-wrap">
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>
              <span>昵称</span>
            </th>
            <th>
              <span>年级</span>
            </th>
            <th>
              <span>性别</span>
            </th>
            <th>
              <span>备注</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {map(props.data, (student, index) => (
            <tr key={student.id}>
              <td className="lalign">
                <span className="index">{index + 1}</span>
                <span className="student-name">
                  {student.name}
                  {student.status !== EUserType.STUDENT && (
                    <img
                      height="14"
                      src={`img/${iconMap[student.status]}`}
                      alt="student-status-png"
                    ></img>
                  )}
                </span>
              </td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList
