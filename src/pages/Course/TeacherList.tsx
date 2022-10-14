import { useCallback, useEffect, useState } from 'react'
import { recommandTeachars, ITeachar } from '../../constants'
import * as api from '../../api'

import './TeacharList.scss'

const TeacharList = ({ showAll }: { showAll: boolean }) => {
  const [allTeachars, setAllTeachars] = useState<ITeachar[]>([])

  const loadData = useCallback(async () => {
    if (showAll && allTeachars.length === 0) {
      const res = await api.getTeachars()
      const { teacherList } = res
      setAllTeachars(teacherList)
    }
  }, [showAll, allTeachars.length])

  useEffect(() => {
    loadData()
  }, [loadData])

  const data = showAll ? allTeachars : recommandTeachars

  return (
    <div className="teachar-recommand">
      {data.map((teachar) => (
        <div key={teachar.name} className="teachar-intro">
          <img src={teachar.avatarUrl} alt="avatar" className="avatar" />
          <div className="info">
            <div className="teachar-title">
              <div className="teachar-name">{teachar.name}老师</div>
              <span className="teachar-tag">
                课程<span>{teachar.coursesCount}</span>
                学生<span>{teachar.studentsCount}</span>
              </span>
            </div>
            <div className="teach-intro">{teachar.info}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default TeacharList
