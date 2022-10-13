import React from 'react'
import { map, isEmpty } from 'lodash'
import Empty from '../../../components/Empty'

import './StudentList.scss'

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
                <span>{index + 1}</span>
                {student.name}
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
